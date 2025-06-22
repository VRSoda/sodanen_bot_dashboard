import { Router } from "express";
import passport from "passport";

const router = Router();

// Discord OAuth 로그인 시작
router.get("/discord", passport.authenticate("discord"));

// Discord OAuth 콜백
router.get(
    "/discord/callback",
    passport.authenticate("discord", {
        failureRedirect: "http://localhost:5173?error=auth_failed",
    }),
    (req, res) => {
        // 로그인 성공 시 클라이언트로 리다이렉트
        res.redirect("http://localhost:5173/dashboard");
    }
);

// 로그아웃
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error("Session destruction error:", destroyErr);
                return res.status(500).json({ message: "Error destroying session." });
            }
            res.clearCookie("connect.sid"); // 세션 쿠키 이름이 다를 경우 수정 필요
            res.status(200).json({ message: "Logged out successfully." });
        });
    });
});

// 로그인 상태 확인
router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: req.user,
        });
    } else {
        res.json({
            authenticated: false,
        });
    }
});

// 사용자 정보 가져오기
router.get("/user", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "인증이 필요합니다." });
    }

    const user = req.user as any;
    res.json({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        discriminator: user.discriminator,
        guilds: user.guilds || [],
    });
});

export default router;
