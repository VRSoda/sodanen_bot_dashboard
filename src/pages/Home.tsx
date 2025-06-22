import React from "react";
import { Box, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const Home: React.FC = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

    const handleLogin = () => {
        window.location.href = `${SERVER_URL}/auth/discord`;
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
            <Card sx={{ p: { xs: 2, sm: 4, md: 6 }, width: "100%", maxWidth: "600px", textAlign: "center" }}>
                <CardContent>
                    <SmartToyIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            background: "linear-gradient(135deg, #7289DA, #57F287)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Sodanen Bot
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        당신의 Discord 서버를 위한 최고의 파트너.
                    </Typography>

                    {!isAuthenticated ? (
                        <Button variant="contained" size="large" onClick={handleLogin} startIcon={<SmartToyIcon />} sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
                            Discord로 시작하기
                        </Button>
                    ) : (
                        <Box>
                            <Typography sx={{ mb: 2 }}>{user?.username}님, 환영합니다!</Typography>
                            <Button variant="contained" size="large" onClick={() => navigate("/dashboard")} sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}>
                                대시보드로 이동
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Home;
