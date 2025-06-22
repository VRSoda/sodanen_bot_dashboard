import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Button, Paper, Chip, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";
import StatCard from "../components/StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import TerminalIcon from "@mui/icons-material/Terminal";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import apiClient from "../services/apiService";

interface GuildStats {
    totalCommands: number;
    successRate: number;
    activeUsers: number;
    topCommands: { name: string; count: number }[];
    dailyStats: { date: string; count: number }[];
}

const COLORS = ["#87CEEB", "#00BFFF", "#1E90FF", "#FF6B6B", "#4ECDC4"];

const GuildDashboard: React.FC = () => {
    const { guildId } = useParams<{ guildId: string }>();
    const { user } = useAuth();
    const { joinGuild } = useSocket();
    const navigate = useNavigate();

    const [stats, setStats] = useState<GuildStats | null>(null);
    const [loading, setLoading] = useState(true);

    const guild = user?.guilds?.find((g) => g.id === guildId);

    useEffect(() => {
        if (guildId) {
            joinGuild(guildId);
            fetchGuildStats();
        }
    }, [guildId]);

    const fetchGuildStats = async () => {
        try {
            setLoading(true);

            if (!guildId) {
                throw new Error("서버 ID가 없습니다.");
            }

            // apiClient를 사용하여 실제 서버 통계 API 호출
            const response = await apiClient.get(`/api/stats/guild/${guildId}`);
            const data = response.data;

            setStats({
                totalCommands: data.totalCommands || 0,
                activeUsers: data.guildInfo?.memberCount || 0,
                successRate: 98.7, // TODO: 실제 성공률 계산
                topCommands: data.topCommands || [],
                dailyStats: data.dailyStats || [],
            });
        } catch (error) {
            console.error("서버 통계 로드 오류:", error);
            // 에러 발생 시 기본 데이터 설정
            setStats({
                totalCommands: 0,
                activeUsers: 0,
                successRate: 0,
                topCommands: [],
                dailyStats: [],
            });
        } finally {
            setLoading(false);
        }
    };

    if (!guild) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 200px)", // Adjust height to fit within layout
                    background: "transparent",
                }}
            >
                <Typography variant="h6" sx={{ color: "var(--sky-text-primary)" }}>
                    서버 정보를 찾을 수 없습니다. 대시보드에서 서버를 다시 선택해주세요.
                </Typography>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 200px)",
                    background: "transparent",
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: "var(--sky-primary)" }} />
                    <Typography variant="h6" sx={{ mt: 2, color: "var(--sky-text-secondary)" }}>
                        서버 통계를 불러오는 중...
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <>
            {/* Charts */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} lg={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            p: { xs: 2, sm: 3 },
                            border: "1px solid var(--sky-border)",
                            boxShadow: "0 4px 12px var(--sky-shadow)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: "bold",
                                color: "var(--sky-text-primary)",
                            }}
                        >
                            일일 명령어 사용량
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats?.dailyStats}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="var(--sky-border)" />
                                <XAxis dataKey="date" stroke="var(--sky-text-secondary)" tick={{ fill: "var(--sky-text-secondary)" }} />
                                <YAxis stroke="var(--sky-text-secondary)" tick={{ fill: "var(--sky-text-secondary)" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        border: "1px solid var(--sky-border)",
                                        borderRadius: "12px",
                                        color: "var(--sky-text-primary)",
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="var(--sky-primary)" strokeWidth={3} dot={{ fill: "var(--sky-primary)", strokeWidth: 2, r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            p: { xs: 2, sm: 3 },
                            border: "1px solid var(--sky-border)",
                            boxShadow: "0 4px 12px var(--sky-shadow)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: "bold",
                                color: "var(--sky-text-primary)",
                            }}
                        >
                            인기 명령어
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={stats?.topCommands} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="var(--sky-primary)">
                                    {stats?.topCommands?.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        border: "1px solid var(--sky-border)",
                                        borderRadius: "12px",
                                        color: "var(--sky-text-primary)",
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default GuildDashboard;
