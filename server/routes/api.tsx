import { Router } from "express";
import type { Guild } from "discord.js";
import { sequelize } from "../src/database/connection";
import CommandStats from "../src/database/models/CommandStats";
import GuildModel from "../src/database/models/Guild";
import { Op } from "sequelize";
import Announcement from "../src/database/models/Announcement";
import User from "../src/database/models/User";
import discordClient from "../src/bot";
import { ChannelType } from "discord.js";

const router = Router();

// 디버깅용 미들웨어
router.use((req, res, next) => {
    console.log(`[API Router] ${req.method} ${req.originalUrl} - Body:`, req.body);
    next();
});

// 헬스 체크
router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// 데이터베이스 상태 확인
router.get("/database/status", async (req, res) => {
    try {
        await sequelize.authenticate();
        const dbInfo = await sequelize.query("SELECT VERSION() as version, NOW() as current_time");

        res.json({
            connected: true,
            status: "online",
            version: (dbInfo[0] as any)[0]?.version || "Unknown",
            currentTime: (dbInfo[0] as any)[0]?.current_time || new Date().toISOString(),
        });
    } catch (error) {
        console.error("Database status check error:", error);
        res.status(503).json({
            connected: false,
            status: "offline",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 전체 통계 가져오기
router.get("/stats/overview", async (req, res) => {
    try {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const totalCommandsResult = await CommandStats.findOne({
            attributes: [[sequelize.fn("SUM", sequelize.col("count")), "total"]],
            raw: true,
        });
        const totalCommands = (totalCommandsResult as any)?.total || 0;

        const todayCommandsResult = await CommandStats.count({
            where: { updatedAt: { [Op.gte]: today } },
        });

        const activeGuilds = req.bot && req.bot.isReady() ? req.bot.guilds.cache.size : 0;
        const totalUsers = req.bot && req.bot.isReady() ? req.bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) : 0;

        const topCommands = await CommandStats.findAll({
            attributes: ["commandName", [sequelize.fn("SUM", sequelize.col("count")), "totalUsage"]],
            group: ["commandName"],
            order: [[sequelize.fn("SUM", sequelize.col("count")), "DESC"]],
            limit: 5,
            raw: true,
        });

        res.json({
            todayCommands: todayCommandsResult || 0,
            totalCommands: parseInt(totalCommands, 10),
            activeGuilds,
            totalUsers,
            topCommands: topCommands.map((cmd: any) => ({
                name: cmd.commandName,
                count: parseInt(cmd.totalUsage, 10),
            })),
        });
    } catch (error) {
        console.error("Stats overview error:", error);
        res.status(500).json({
            error: "통계를 가져오는 중 오류가 발생했습니다.",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 특정 서버 통계 가져오기
router.get("/stats/guild/:guildId", async (req, res) => {
    try {
        const { guildId } = req.params;
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const totalCommandsResult = await CommandStats.findOne({
            where: { guildId },
            attributes: [[sequelize.fn("SUM", sequelize.col("count")), "total"]],
            raw: true,
        });
        const totalCommands = (totalCommandsResult as any)?.total || 0;

        const todayCommandsResult = await CommandStats.count({
            where: { guildId, updatedAt: { [Op.gte]: today } },
        });

        const recentCommands = await CommandStats.findAll({
            where: { guildId },
            order: [["lastExecuted", "DESC"]],
            limit: 5,
            raw: true,
        });

        const dailyStats = [];
        for (let i = 6; i >= 0; i--) {
            const now = new Date();
            const targetDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));

            const dayStart = new Date(targetDate);
            dayStart.setUTCHours(0, 0, 0, 0);

            const dayEnd = new Date(targetDate);
            dayEnd.setUTCHours(23, 59, 59, 999);

            const count = await CommandStats.count({
                where: {
                    guildId: guildId,
                    updatedAt: {
                        [Op.gte]: dayStart,
                        [Op.lte]: dayEnd,
                    },
                },
            });

            const year = dayStart.getUTCFullYear();
            const month = String(dayStart.getUTCMonth() + 1).padStart(2, "0");
            const day = String(dayStart.getUTCDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            dailyStats.push({
                date: formattedDate,
                count: count,
            });
        }

        let guildInfo = null;
        if (req.bot && req.bot.isReady()) {
            const guild = req.bot.guilds.cache.get(guildId);
            if (guild) {
                guildInfo = {
                    name: guild.name,
                    memberCount: guild.memberCount,
                    joinedAt: guild.joinedAt?.toISOString(),
                };
            }
        }

        res.json({
            guildId,
            guildInfo,
            todayCommands: todayCommandsResult,
            totalCommands: parseInt(totalCommands, 10),
            recentCommands: recentCommands.map((cmd: any) => ({
                name: cmd.commandName,
                count: parseInt(cmd.count, 10),
            })),
            dailyStats,
        });
    } catch (error) {
        console.error("Guild stats error:", error);
        res.status(500).json({
            error: "서버 통계를 가져오는 중 오류가 발생했습니다.",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 사용자 서버 목록 가져오기
router.get("/user/guilds", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "인증이 필요합니다." });
    }

    const user = req.user as any;
    if (!user || !user.guilds) {
        return res.status(404).json({ error: "사용자 서버 정보를 찾을 수 없습니다." });
    }

    res.json(user.guilds);
});

// 봇 상태 확인
router.get("/bot/status", (req, res) => {
    if (req.bot && req.bot.isReady()) {
        const guilds = req.bot.guilds.cache;
        const guildIds = guilds.map((guild: Guild) => guild.id);

        const responseData = {
            online: true,
            guildCount: guilds.size,
            userCount: req.bot.users.cache.size,
            guildIds: guildIds,
        };
        res.json(responseData);
    } else {
        res.status(503).json({
            online: false,
            message: "Bot is not ready.",
        });
    }
});

// 서비스 상태 확인
router.get("/services/status", async (req, res) => {
    try {
        const services = [];

        // Discord Bot 상태
        const botStatus = req.bot && req.bot.isReady() ? "online" : "offline";
        services.push({
            id: 1,
            name: "Discord Bot",
            status: botStatus,
        });

        // Database 상태
        let dbStatus = "online";
        try {
            await sequelize.authenticate();
        } catch (e) {
            dbStatus = "offline";
        }
        services.push({
            id: 2,
            name: "Database",
            status: dbStatus,
        });

        // Uptime Kuma (if configured)
        const uptimeKumaUrl = process.env.UPTIME_KUMA_STATUS_URL;
        if (uptimeKumaUrl) {
            try {
                // 이 부분은 실제 Uptime Kuma API 응답에 맞게 조정 필요
                // const response = await fetch(uptimeKumaUrl);
                // const data = await response.json();
                services.push({
                    id: 3,
                    name: "Uptime Kuma",
                    status: "online", // Placeholder
                });
            } catch (error) {
                services.push({
                    id: 3,
                    name: "Uptime Kuma",
                    status: "offline",
                });
            }
        }

        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "서비스 상태를 가져오는 중 오류가 발생했습니다." });
    }
});

// 공지사항 CRUD
router.get("/announcements", async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.json(announcements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ error: "공지사항을 가져오는 중 오류가 발생했습니다." });
    }
});

router.post("/announcements", async (req, res) => {
    try {
        const { title, content, authorId, authorName } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "제목과 내용은 필수입니다." });
        }
        const announcement = await Announcement.create({ title, content, authorId, authorName });
        res.status(201).json(announcement);
    } catch (error) {
        console.error("Error creating announcement:", error);
        res.status(500).json({ error: "공지사항을 생성하는 중 오류가 발생했습니다." });
    }
});

router.put("/announcements/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const announcement = await Announcement.findByPk(id);
        if (!announcement) {
            return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
        }
        announcement.title = title ?? announcement.title;
        announcement.content = content ?? announcement.content;
        await announcement.save();
        res.json(announcement);
    } catch (error) {
        console.error("Error updating announcement:", error);
        res.status(500).json({ error: "공지사항을 업데이트하는 중 오류가 발생했습니다." });
    }
});

router.delete("/announcements/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await Announcement.findByPk(id);
        if (!announcement) {
            return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
        }
        await announcement.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ error: "공지사항을 삭제하는 중 오류가 발생했습니다." });
    }
});

// 길드 설정 가져오기
router.get("/settings/:guildId", async (req, res) => {
    try {
        const { guildId } = req.params;
        let guild = await GuildModel.findOne({ where: { guildId } });

        if (!guild) {
            // 봇 클라이언트에서 길드 정보 가져오기
            let guildName = "Unknown";
            let memberCount = 0;
            if (req.bot && req.bot.isReady()) {
                const fetchedGuild = await req.bot.guilds.cache.get(guildId);
                if (fetchedGuild) {
                    guildName = fetchedGuild.name;
                    memberCount = fetchedGuild.memberCount;
                }
            }

            // 길드가 없으면 기본값으로 생성
            guild = await GuildModel.create({
                guildId: guildId,
                name: guildName,
                iconUrl: null,
                ownerId: "unknown",
                memberCount: memberCount,
                prefix: "!",
                settings: {},
                translationEnabled: false,
                translationSourceLang: "ko",
                translationTargetLang: "en",
                translationExcludedChannels: null,
                isActive: true,
            });
        }

        const guildData: any = guild.toJSON();
        try {
            guildData.translationExcludedChannels = JSON.parse(guildData.translationExcludedChannels || "[]");
        } catch (e) {
            guildData.translationExcludedChannels = [];
        }

        res.json(guildData);
    } catch (error) {
        console.error("Error fetching guild settings:", error);
        res.status(500).json({ error: "서버 설정을 가져오는 데 실패했습니다." });
    }
});

// 길드 설정 업데이트
router.post("/settings/:guildId", async (req, res) => {
    try {
        const { guildId } = req.params;
        const dataToSave = { ...req.body };

        // DB 저장을 위해 배열을 JSON 문자열로 확실하게 변환
        if (Array.isArray(dataToSave.translationExcludedChannels)) {
            dataToSave.translationExcludedChannels = JSON.stringify(dataToSave.translationExcludedChannels);
        }

        const guild = await GuildModel.findOne({ where: { guildId } });

        if (guild) {
            // 길드가 존재하면 업데이트
            await guild.update(dataToSave);
        } else {
            // 길드가 없으면 생성
            await GuildModel.create({
                ...dataToSave,
                guildId: guildId,
                name: "Unknown",
                ownerId: "Unknown",
            } as any);
        }

        // 최신 데이터를 다시 불러와서 클라이언트에 반환
        const updatedGuild = await GuildModel.findOne({ where: { guildId } });
        if (!updatedGuild) {
            return res.status(404).json({ message: "Guild not found after operation" });
        }

        const updatedGuildData: any = updatedGuild.toJSON();
        try {
            // 클라이언트에 응답하기 전에 다시 JSON 배열로 파싱
            if (typeof updatedGuildData.translationExcludedChannels === "string") {
                updatedGuildData.translationExcludedChannels = JSON.parse(updatedGuildData.translationExcludedChannels);
            }
        } catch (e) {
            updatedGuildData.translationExcludedChannels = [];
        }

        res.json(updatedGuildData);
    } catch (error) {
        console.error("Error saving guild settings:", error);
        res.status(500).json({ message: "Error saving guild settings" });
    }
});

// Discord 채널 목록 가져오기
router.get("/discord/channels/:guildId", async (req, res) => {
    try {
        const { guildId } = req.params;
        const guild = await discordClient.guilds.fetch(guildId);
        if (!guild) {
            return res.status(404).json({ message: "Guild not found" });
        }

        const channels = await guild.channels.fetch();
        const groupedChannels: { label: string; options: { id: string; name: string }[] }[] = [];

        // 카테고리 없는 채널 그룹
        const channelsWithoutCategory = {
            label: "카테고리 없음",
            options: channels.filter((c): c is NonNullable<typeof c> => c !== null && !c.parent && (c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)).map((c) => ({ id: c.id, name: c.name })),
        };
        if (channelsWithoutCategory.options.length > 0) {
            groupedChannels.push(channelsWithoutCategory);
        }

        // 카테고리별 그룹
        channels
            .filter((c): c is NonNullable<typeof c> => c !== null && c.type === ChannelType.GuildCategory)
            .forEach((category) => {
                groupedChannels.push({
                    label: category.name,
                    options: channels.filter((c): c is NonNullable<typeof c> => c !== null && c.parentId === category.id && (c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)).map((c) => ({ id: c.id, name: c.name })),
                });
            });

        res.json(groupedChannels);
    } catch (error) {
        console.error("Error fetching Discord channels:", error);
        res.status(500).json({ message: "Error fetching Discord channels" });
    }
});

export default router;
