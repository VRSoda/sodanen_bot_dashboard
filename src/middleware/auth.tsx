import { Request, Response, NextFunction } from "express";

// 인증 확인 미들웨어
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    // AJAX 요청인 경우 JSON 응답
    if (req.xhr || req.headers.accept?.indexOf("json") !== -1) {
        return res.status(401).json({
            error: "인증이 필요합니다.",
            redirect: "/auth/discord",
        });
    }

    // 일반 요청인 경우 로그인 페이지로 리다이렉트
    res.redirect("/auth/discord");
};

// 관리자 권한 확인 미들웨어
export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "인증이 필요합니다." });
    }

    const user = req.user as any;
    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || [];

    if (!adminIds.includes(user.id)) {
        return res.status(403).json({ error: "관리자 권한이 필요합니다." });
    }

    next();
};

// 서버 관리 권한 확인 미들웨어
export const ensureGuildAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "인증이 필요합니다." });
    }

    const user = req.user as any;
    const guildId = req.params.guildId;

    if (!guildId) {
        return res.status(400).json({ error: "서버 ID가 필요합니다." });
    }

    // 사용자의 길드 목록에서 해당 길드의 관리 권한 확인
    const userGuild = user.guilds?.find((guild: any) => guild.id === guildId);

    if (!userGuild) {
        return res.status(403).json({ error: "해당 서버에 접근할 수 없습니다." });
    }

    // 관리자 권한 확인 (MANAGE_GUILD 권한이나 서버 소유자)
    const hasManageGuild = (userGuild.permissions & 0x20) === 0x20; // MANAGE_GUILD
    const isOwner = userGuild.owner;

    if (!hasManageGuild && !isOwner) {
        return res.status(403).json({ error: "서버 관리 권한이 필요합니다." });
    }

    next();
};

// API 키 검증 미들웨어 (봇과의 통신용)
export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"] || req.query.apiKey;
    const validApiKey = process.env.BOT_API_KEY;

    if (!validApiKey) {
        return res.status(500).json({ error: "API 키가 설정되지 않았습니다." });
    }

    if (apiKey !== validApiKey) {
        return res.status(401).json({ error: "유효하지 않은 API 키입니다." });
    }

    next();
};
