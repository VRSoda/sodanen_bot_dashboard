import { Router } from 'express';

const router = Router();

// 헬스 체크
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 봇 상태 확인
router.get('/bot/status', (req, res) => {
    res.json({
        online: true,
        guilds: 12,
        users: 1250,
        commands: 45230
    });
});

export default router;