import React from "react";
import { Box, Container, Typography, Paper, Avatar, Button, Card, CardContent, Fade, Grid, Stack } from "@mui/material";
import { PlayArrow as PlayIcon, People as PeopleIcon, Settings as SettingsIcon, Launch as LaunchIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ProfileImage from "../image/Bot_Logo.png";
import { useAuth } from "../contexts/AuthContext";
import "./Home.css";

// 스타일드 컴포넌트
const MainSection = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(8, 0),
    backgroundColor: "#fafafa",
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(4),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: "100%",
    border: "1px solid #e0e0e0",
    borderRadius: theme.spacing(2),
    transition: "all 0.2s ease",
    "&:hover": {
        borderColor: theme.palette.primary.main,
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
}));

const StatItem = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(2),
}));

const SimpleButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    textTransform: "none",
    fontWeight: 500,
    padding: theme.spacing(1, 3),
}));

const Home: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            icon: <PlayIcon sx={{ fontSize: 32, color: "#1976d2" }} />,
            title: "음악 재생",
            description: "고품질 음악 스트리밍과 플레이리스트 관리",
        },
        {
            icon: <SettingsIcon sx={{ fontSize: 32, color: "#ed6c02" }} />,
            title: "서버 관리",
            description: "효율적인 Discord 서버 관리 도구",
        },
        {
            icon: <PeopleIcon sx={{ fontSize: 32, color: "#2e7d32" }} />,
            title: "커뮤니티",
            description: "활발한 사용자 커뮤니티와 지원",
        },
    ];

    const stats = [
        { number: "10,000+", label: "서버" },
        { number: "500K+", label: "사용자" },
        { number: "99.9%", label: "가동률" },
        { number: "24/7", label: "지원" },
    ];

    const handleLogin = () => {
        // Discord OAuth 로그인 URL로 리다이렉트
        window.location.href = "http://localhost:3001/auth/discord";
    };

    const handleLogout = () => {
        // 로그아웃 API 호출
        window.location.href = "http://localhost:3001/auth/logout";
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Fade in={isVisible} timeout={600}>
                <Box>
                    {/* 메인 섹션 */}
                    <MainSection>
                        <Avatar
                            src={ProfileImage}
                            alt="Sodanen Bot"
                            sx={{
                                width: 80,
                                height: 80,
                                mx: "auto",
                                mb: 3,
                                border: "3px solid #1976d2",
                            }}
                        />
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                color: "#1a1a1a",
                                mb: 2,
                            }}
                        >
                            Sodanen Bot
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#666",
                                mb: 4,
                                maxWidth: 500,
                                mx: "auto",
                            }}
                        >
                            Discord 서버를 위한 심플하고 강력한 다목적 봇
                        </Typography>
                        {!isAuthenticated ? (
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
                                <SimpleButton variant="contained" size="large" onClick={handleLogin} startIcon={<LaunchIcon />}>
                                    Discord로 로그인
                                </SimpleButton>
                                <SimpleButton variant="outlined" size="large" onClick={() => window.open("/commands", "_self")}>
                                    명령어 보기
                                </SimpleButton>
                            </Stack>
                        ) : (
                            <div className="user-info">
                                <p>안녕하세요, {user?.username}님!</p>
                                <button className="logout-button" onClick={handleLogout}>
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </MainSection>

                    {/* 통계 */}
                    <Box sx={{ mb: 6 }}>
                        <Grid container spacing={0}>
                            {stats.map((stat, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <StatItem>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#1976d2",
                                                mb: 0.5,
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#666" }}>
                                            {stat.label}
                                        </Typography>
                                    </StatItem>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* 기능 섹션 */}
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            textAlign="center"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                color: "#1a1a1a",
                                mb: 4,
                            }}
                        >
                            주요 기능
                        </Typography>
                        <Grid container spacing={3}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <FeatureCard elevation={0}>
                                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                                            <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "#1a1a1a",
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#666",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </FeatureCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* 상태 섹션 */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            backgroundColor: "#f0f7ff",
                            border: "1px solid #e3f2fd",
                            textAlign: "center",
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
                            <CheckIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: "#1a1a1a",
                                }}
                            >
                                서비스 정상 운영 중
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#666",
                                mb: 3,
                            }}
                        >
                            24시간 안정적인 서비스를 제공하고 있습니다
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                            <SimpleButton variant="outlined" size="small" onClick={() => window.open("/status", "_self")}>
                                서비스 상태
                            </SimpleButton>
                            <SimpleButton variant="outlined" size="small" onClick={() => window.open("/announcements", "_self")}>
                                공지사항
                            </SimpleButton>
                        </Stack>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
};

export default Home;
