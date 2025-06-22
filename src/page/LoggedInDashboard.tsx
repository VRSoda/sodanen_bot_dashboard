import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, TextField, Button, Chip, Avatar, IconButton, CircularProgress, Fade, Paper, InputAdornment, Tabs, Tab, Badge } from "@mui/material";
import { Refresh as RefreshIcon, Search as SearchIcon, Settings as SettingsIcon, Add as AddIcon, AdminPanelSettings as AdminIcon, People as PeopleIcon, Launch as LaunchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getServerIconUrl, getServerBackgroundColor, getBotInviteUrl } from "../services/apiService";
import { UserData } from "../types";
import apiClient from "../services/apiService";

interface LocalDiscordServer {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    backgroundColor: string;
    memberCount?: number;
    features?: string[];
}

interface LoggedInDashboardProps {
    userData: UserData;
}

const ServerCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    borderRadius: theme.spacing(2),
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.shadows[8],
    },
}));

const ServerHeader = styled(Box)(({ theme }) => ({
    height: 100,
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
}));

const ServerAvatar = styled(Avatar)(({ theme }) => ({
    width: 64,
    height: 64,
    position: "absolute",
    bottom: -32,
    left: theme.spacing(2),
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[3],
    fontSize: "1.5rem",
    fontWeight: "bold",
}));

const ControlsContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
}));

const LoggedInDashboard: React.FC<LoggedInDashboardProps> = ({ userData: _ }) => {
    const [servers, setServers] = useState<LocalDiscordServer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredServers, setFilteredServers] = useState<LocalDiscordServer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedView, setSelectedView] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 로딩 시간을 짧게 설정 (테스트용)
        const timer = setTimeout(() => setIsVisible(true), 200);
        fetchServers(); // 바로 데이터 로드
        return () => clearTimeout(timer);
    }, []);

    const fetchServers = async () => {
        try {
            setIsLoading(true);

            // 사용자 서버 데이터 가져오기
            const userServersResponse = await apiClient.get("/api/user/guilds");
            const userServers = userServersResponse.data;

            // 봇이 속한 서버 목록 가져오기
            const botStatusResponse = await apiClient.get("/api/bot/status");
            const botStatus = botStatusResponse.data;

            // 사용자 서버 중 봇이 속한 서버만 필터링
            const botGuildIds = botStatus.guildIds || [];
            const filteredServers = userServers.filter((server: any) => botGuildIds.includes(server.id));

            const formatted = filteredServers.map((server: any) => ({
                id: server.id,
                name: server.name,
                icon: server.icon,
                owner: server.owner,
                permissions: server.permissions,
                backgroundColor: getServerBackgroundColor(server.id),
                memberCount: server.approximate_member_count || 0,
                features: server.features || [],
            }));

            setServers(formatted);
        } catch (error: unknown) {
            console.error("서버 가져오기 오류:", error);
            // 에러 발생 시 빈 배열로 설정
            setServers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let results = servers;
        if (searchTerm) {
            results = results.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (selectedView === 1) {
            results = results.filter((s) => s.owner);
        }
        setFilteredServers(results);
    }, [searchTerm, servers, selectedView]);

    const handleJoinServer = (serverId: string) => {
        const server = servers.find((s) => s.id === serverId);
        if (!server) {
            alert(`서버 ${serverId}를 찾을 수 없습니다.`);
            return;
        }
        try {
            const inviteUrl = getBotInviteUrl(serverId);
            window.open(inviteUrl, "_blank");
        } catch (error) {
            console.error("봇 초대 오류:", error);
            alert("봇 초대 중 오류가 발생했습니다.");
        }
    };

    const renderLoadingState = () => (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                    서버 목록을 불러오는 중...
                </Typography>
            </Box>
        </Box>
    );

    const renderEmptyState = () => (
        <Box sx={{ textAlign: "center", py: 10 }}>
            <Box sx={{ mb: 3 }}>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: "#9CA3AF" }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom>
                서버를 찾을 수 없습니다
            </Typography>
            <Typography variant="body1" color="text.disabled">
                검색 조건을 확인하거나 새로고침을 시도해보세요.
            </Typography>
        </Box>
    );

    const renderServers = () => {
        if (isLoading) return renderLoadingState();
        if (filteredServers.length === 0) return renderEmptyState();

        return (
            <Grid container spacing={3}>
                {filteredServers.map((server) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={server.id}>
                        <Fade in={isVisible} timeout={800}>
                            <ServerCard elevation={2}>
                                <ServerHeader>
                                    {server.owner && (
                                        <Chip
                                            icon={<AdminIcon />}
                                            label="관리자"
                                            size="small"
                                            color="secondary"
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                right: 12,
                                                bgcolor: "rgba(255, 255, 255, 0.9)",
                                                color: "primary.main",
                                                fontWeight: 600,
                                            }}
                                        />
                                    )}
                                    <ServerAvatar src={server.icon ? getServerIconUrl(server) || undefined : undefined} alt={`${server.name} 아이콘`}>
                                        {!server.icon && server.name.charAt(0).toUpperCase()}
                                    </ServerAvatar>
                                </ServerHeader>

                                <CardContent sx={{ pt: 5, pb: 2 }}>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 600,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                        title={server.name}
                                    >
                                        {server.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <PeopleIcon sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            회원 {server.memberCount?.toLocaleString()}명
                                        </Typography>
                                    </Box>

                                    {server.features && server.features.length > 0 && (
                                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 1 }}>
                                            {server.features.slice(0, 2).map((feature) => (
                                                <Chip key={feature} label={feature} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                                            ))}
                                        </Box>
                                    )}
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleJoinServer(server.id)}
                                        startIcon={<LaunchIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {server.owner ? "관리하기" : "초대하기"}
                                    </Button>

                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "text.secondary",
                                            "&:hover": {
                                                bgcolor: "action.hover",
                                            },
                                        }}
                                        aria-label="서버 설정"
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                </CardActions>
                            </ServerCard>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in={isVisible} timeout={600}>
                <Box>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            mb: 4,
                            textAlign: "center",
                        }}
                    >
                        서버 대시보드
                    </Typography>

                    <ControlsContainer elevation={3}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    placeholder="서버 이름 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Tabs
                                    value={selectedView}
                                    onChange={(_, newValue) => setSelectedView(newValue)}
                                    variant="fullWidth"
                                    sx={{
                                        "& .MuiTabs-indicator": {
                                            height: 3,
                                            borderRadius: 1.5,
                                        },
                                    }}
                                >
                                    <Tab
                                        label={
                                            <Badge badgeContent={servers.length} color="primary">
                                                모든 서버
                                            </Badge>
                                        }
                                        sx={{ textTransform: "none", fontWeight: 600 }}
                                    />
                                    <Tab
                                        label={
                                            <Badge badgeContent={servers.filter((s) => s.owner).length} color="secondary">
                                                관리 서버
                                            </Badge>
                                        }
                                        sx={{ textTransform: "none", fontWeight: 600 }}
                                    />
                                </Tabs>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton
                                        onClick={fetchServers}
                                        disabled={isLoading}
                                        sx={{
                                            bgcolor: "action.hover",
                                            "&:hover": {
                                                bgcolor: "action.selected",
                                            },
                                        }}
                                        aria-label="새로고침"
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => window.open("https://discord.com/new", "_blank")}
                                        sx={{
                                            bgcolor: "primary.main",
                                            color: "white",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                        aria-label="서버 만들기"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </ControlsContainer>

                    {renderServers()}
                </Box>
            </Fade>
        </Container>
    );
};

export default LoggedInDashboard;
