import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Container, Select, MenuItem, FormControl, Avatar, Button, IconButton, Tooltip, Menu, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Divider, Toolbar, AppBar, Tabs, Tab, Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ServerIcon from "@mui/icons-material/Dns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const DashboardLayout: React.FC = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { guildId } = useParams();

    // 마지막으로 선택한 서버 ID를 상태로 관리
    const [activeGuildId, setActiveGuildId] = useState<string | undefined>(guildId);

    const [botGuildIds, setBotGuildIds] = useState<string[]>([]);
    const [guildsLoading, setGuildsLoading] = useState(true);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [serverMenuAnchorEl, setServerMenuAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const fetchBotGuilds = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/api/bot/status`);
                const data = await response.json();
                setBotGuildIds(data.guildIds || []);
            } catch (error) {
                console.error("Failed to fetch bot guilds:", error);
            } finally {
                setGuildsLoading(false);
            }
        };
        fetchBotGuilds();
    }, []);

    // URL의 guildId가 바뀔 때 activeGuildId도 업데이트
    useEffect(() => {
        if (guildId) {
            setActiveGuildId(guildId);
        }
    }, [guildId]);

    if (authLoading || guildsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        navigate("/");
        return null;
    }

    const manageableGuilds = user.guilds?.filter((g) => (g.owner || (BigInt(g.permissions) & BigInt(0x20)) === BigInt(0x20)) && botGuildIds.includes(g.id)) || [];

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget);
    const handleMenuClose = () => setMenuAnchorEl(null);
    const handleServerMenuClick = (event: React.MouseEvent<HTMLElement>) => setServerMenuAnchorEl(event.currentTarget);
    const handleServerMenuClose = () => setServerMenuAnchorEl(null);

    const handleServerSelect = (newGuildId: string) => {
        setActiveGuildId(newGuildId);
        // 서버를 선택하면 기본적으로 통계 페이지로 이동
        navigate(`/dashboard/guild/${newGuildId}/stats`);
        handleServerMenuClose();
    };

    const getGuildIcon = (guild: any) => (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : undefined);
    const getAvatarUrl = (user: any) => (user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${user ? parseInt(user.discriminator) % 5 : 0}.png`);

    const selectedGuildData = manageableGuilds.find((g) => g.id === activeGuildId);

    const getTabValue = () => {
        const path = location.pathname;
        if (path.includes("/announcements")) return 2;
        if (path.endsWith("/settings")) return 1;
        if (path.endsWith("/stats")) return 0;
        return false; // 아무 탭도 선택되지 않음
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        let path = "";
        switch (newValue) {
            case 0:
                path = `/dashboard/guild/${activeGuildId}/stats`;
                break;
            case 1:
                path = `/dashboard/guild/${activeGuildId}/settings`;
                break;
            case 2:
                path = "/dashboard/announcements";
                break;
        }
        if (path) navigate(path);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
            <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E5E7EB" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>
                            Sodanen Bot
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Button variant="outlined" startIcon={<ServerIcon />} endIcon={<KeyboardArrowDownIcon />} onClick={handleServerMenuClick}>
                                {selectedGuildData ? selectedGuildData.name : "서버 선택"}
                            </Button>
                            <Menu anchorEl={serverMenuAnchorEl} open={Boolean(serverMenuAnchorEl)} onClose={handleServerMenuClose}>
                                <List dense sx={{ minWidth: 220 }}>
                                    <ListItem>
                                        <ListItemText primary="서버 목록" />
                                    </ListItem>
                                    <Divider sx={{ my: 1 }} />
                                    {manageableGuilds.map((guild) => (
                                        <ListItemButton key={guild.id} selected={guild.id === activeGuildId} onClick={() => handleServerSelect(guild.id)}>
                                            <ListItemAvatar>
                                                <Avatar src={getGuildIcon(guild)} sx={{ width: 32, height: 32 }} />
                                            </ListItemAvatar>
                                            <ListItemText primary={guild.name} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Menu>
                            <Tooltip title="계정 설정">
                                <IconButton onClick={handleMenuClick} size="small">
                                    <Avatar alt={user.username} src={getAvatarUrl(user)} sx={{ width: 40, height: 40 }} />
                                </IconButton>
                            </Tooltip>
                            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={() => navigate("/dashboard")}>
                                    <DashboardIcon sx={{ mr: 1 }} /> 대시보드로
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <LogoutIcon sx={{ mr: 1 }} /> 로그아웃
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <AppBar position="sticky" component={Paper} elevation={0} sx={{ top: 64, backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E5E7EB" }}>
                <Container maxWidth="xl">
                    <Tabs value={getTabValue()} onChange={handleTabChange} centered>
                        <Tab label="서버 통계" disabled={!activeGuildId} />
                        <Tab label="봇 설정" disabled={!activeGuildId} />
                        <Tab label="공지사항" />
                    </Tabs>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
