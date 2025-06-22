import { Client, GatewayIntentBits, Message } from "discord.js";
import CommandStats from "./database/models/CommandStats";
import { Server as SocketIOServer } from "socket.io";

// 봇에 필요한 권한(Intents) 설정
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Socket.IO 서버 인스턴스를 저장할 변수
let io: SocketIOServer | null = null;

// Socket.IO 서버 설정 함수
export const setSocketIO = (socketIO: SocketIOServer) => {
    io = socketIO;
};

// 명령어 통계 업데이트 및 실시간 전송
export const updateCommandStats = async (guildId: string, commandName: string) => {
    try {
        // CommandStats 업데이트 또는 생성
        const [commandStats, created] = await CommandStats.findOrCreate({
            where: {
                guildId,
                commandName,
            },
            defaults: {
                guildId,
                commandName,
                usage_count: 1,
                last_executed_at: new Date(),
            },
        });

        // 이미 있는 경우 통계 업데이트
        if (!created) {
            commandStats.usage_count += 1;
            commandStats.last_executed_at = new Date();
            await commandStats.save();
        }

        // 실시간으로 클라이언트에 통계 업데이트 전송
        if (io) {
            const statsData = {
                commandName,
                guildId,
                timestamp: new Date(),
            };
            // 해당 서버의 통계 업데이트 전송
            io.emit(`guild-stats-update:${guildId}`, {
                type: "command-executed",
                data: statsData,
            });

            // 전체 통계 업데이트 전송
            io.emit("global-stats-update", {
                type: "command-executed",
                data: statsData,
            });
        }

        console.log(`📊 [Bot Stats] Command executed: ${commandName} in ${guildId}`);
    } catch (error) {
        console.error("❌ [Bot Stats] Error updating command stats:", error);
    }
};

// 메시지 이벤트 핸들러 (명령어 감지)
client.on("messageCreate", async (message: Message) => {
    // 봇 메시지 또는 DM 채널 무시
    if (message.author.bot || !message.guildId) return;

    // 명령어 감지 (예: !help, /ping 등)
    const commandMatch = message.content.match(/^[!\/]([a-zA-Z]+)(\s.*)?$/);
    if (!commandMatch) return;

    const commandName = commandMatch[1];

    try {
        // 예시 명령어 처리
        switch (commandName.toLowerCase()) {
            case "ping":
                await message.reply("Pong! 🏓");
                break;
            case "help":
                await message.reply("도움말: !ping, !help");
                break;
            default:
                // 알 수 없는 명령어는 무시 (통계에 기록하지 않음)
                break;
        }

        // 통계 업데이트
        await updateCommandStats(message.guildId, commandName);
    } catch (error) {
        console.error(`Error processing command ${commandName}:`, error);
        // 에러 발생 시 통계 업데이트 안함
    }
});

client.once("ready", () => {
    if (client.user) {
        console.log(`✅ [Discord Bot] Logged in as ${client.user.tag}`);
    }
});

export const loginBot = () => {
    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token) {
        console.error("🚨 [Discord Bot] Error: DISCORD_BOT_TOKEN is not set in .env file.");
        process.exit(1);
    }
    client.login(token);
};

export default client;
