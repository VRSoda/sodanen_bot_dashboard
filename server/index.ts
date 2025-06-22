import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import cors from "cors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// 내부 모듈 임포트
import botClient, { loginBot, setSocketIO } from "./src/bot";
import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";
import { initializeDatabase } from "./src/database/connection";
import "./src/database/models"; // 모델들 임포트
// .env 파일 로드
dotenv.config();

// Express.Request 인터페이스 확장
declare global {
    namespace Express {
        interface Request {
            bot?: typeof botClient;
        }
    }
}

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTP 및 Socket.IO 서버 설정
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// 미들웨어 설정
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
    console.log(`[Express] Received request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(
    session({
        secret: process.env.SESSION_SECRET || "super_secret_fallback_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
        },
    })
);

// Passport 초기화 및 설정
passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: "/auth/discord/callback", // 전체 URL 대신 상대 경로 사용
            scope: ["identify", "guilds"],
        },
        async (accessToken, refreshToken, profile, done) => {
            // 사용자 정보를 세션에 저장
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

app.use(passport.initialize());
app.use(passport.session());

// 봇 클라이언트를 모든 요청에 주입
app.use((req, res, next) => {
    req.bot = botClient;
    next();
});

// 라우트 설정
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Socket.IO 연결 핸들링
io.on("connection", (socket) => {
    console.log(`🔌 [Socket.IO] Client connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`🔌 [Socket.IO] Client disconnected: ${socket.id}`);
    });
});

// Socket.IO 서버를 봇에 전달
setSocketIO(io);

// 프로덕션 환경에서 React 앱 제공
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
    });
}

// 서버 시작
const startServer = async () => {
    try {
        await initializeDatabase();
        loginBot();
        httpServer.listen(port, () => {
            console.log(`✅ [Express] Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Server failed to start:", error);
        process.exit(1);
    }
};

startServer();
