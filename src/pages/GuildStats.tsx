import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Chip, CircularProgress } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSocket } from "../contexts/SocketContext";
import { useParams } from "react-router-dom";
import { getGuildStats } from "../services/StatsService";
import StatCard from "../components/StatCard";
import TodayIcon from "@mui/icons-material/Today";
import BarChartIcon from "@mui/icons-material/BarChart";

interface DailyStat {
    date: string;
    count: number;
}

interface RecentCommand {
    name: string;
    count: number;
}

interface GuildStatsData {
    todayCommands: number;
    totalCommands: number;
    recentCommands: RecentCommand[];
    dailyStats: DailyStat[];
}

interface RealTimeUpdate {
    type: string;
    data: {
        commandName: string;
        guildId: string;
        timestamp: Date;
    };
}

const GuildStats: React.FC = () => {
    const { guildId } = useParams<{ guildId: string }>();
    const { onGuildStatsUpdate, offGuildStatsUpdate } = useSocket();
    const [stats, setStats] = useState<GuildStatsData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadStats = async () => {
        if (!guildId) return;
        try {
            setLoading(true);
            const data = await getGuildStats(guildId);
            setStats(data);
        } catch (error) {
            console.error("통계 로드 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!guildId) return;

        const handleStatsUpdate = (update: RealTimeUpdate) => {
            if (update.type === "command-executed") {
                loadStats(); // 데이터가 업데이트되면 통계 전체를 다시 불러옵니다.
            }
        };

        onGuildStatsUpdate(guildId, handleStatsUpdate);
        loadStats();

        return () => {
            offGuildStatsUpdate(guildId);
        };
    }, [guildId, onGuildStatsUpdate, offGuildStatsUpdate]);

    if (loading) {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>통계를 불러오는 중...</Typography>
            </Paper>
        );
    }

    if (!stats) {
        return <Typography>통계 데이터를 불러올 수 없습니다.</Typography>;
    }

    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
                서버 통계
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <StatCard title="오늘 실행된 명령어" value={stats.todayCommands} icon={<TodayIcon />} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StatCard title="총 명령어 실행" value={stats.totalCommands} icon={<BarChartIcon />} />
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            일일 명령어 사용량 (최근 7일)
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats.dailyStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="사용량" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            최근 사용된 명령어
                        </Typography>
                        {stats.recentCommands.length > 0 ? (
                            stats.recentCommands.map((cmd, index) => (
                                <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, borderBottom: "1px solid #eee" }}>
                                    <Typography>{cmd.name}</Typography>
                                    <Chip label={`${cmd.count}회`} />
                                </Box>
                            ))
                        ) : (
                            <Typography>최근 사용된 명령어가 없습니다.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GuildStats;
