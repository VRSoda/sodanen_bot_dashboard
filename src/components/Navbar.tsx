import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton, Menu, MenuItem, useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const Navbar: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
    };

    const handleDashboard = () => {
        handleClose();
        navigate("/dashboard");
    };

    const handleLogin = () => {
        window.location.href = `${SERVER_URL}/auth/discord`;
    };

    const getAvatarUrl = (user: any) => {
        if (user.avatar) {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        }
        return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--sky-border)",
                boxShadow: "0 2px 8px var(--sky-shadow)",
                color: "var(--sky-text-primary)",
            }}
        >
            <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
                <SmartToyIcon
                    sx={{
                        mr: { xs: 1, sm: 2 },
                        color: "var(--sky-primary)",
                        fontSize: { xs: 24, sm: 28 },
                    }}
                />
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    component="div"
                    sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                        background: "var(--sky-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                    onClick={() => navigate("/")}
                >
                    {isMobile ? "Sodanen Bot" : "Sodanen Bot Dashboard"}
                </Typography>

                {isAuthenticated ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="large"
                            aria-label="user menu"
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{
                                color: "var(--sky-text-primary)",
                                "&:hover": {
                                    backgroundColor: "rgba(135, 206, 235, 0.1)",
                                },
                            }}
                        >
                            <Avatar
                                src={getAvatarUrl(user)}
                                alt={user?.username}
                                sx={{
                                    width: { xs: 28, sm: 32 },
                                    height: { xs: 28, sm: 32 },
                                    border: "2px solid var(--sky-primary)",
                                }}
                            />
                        </IconButton>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            slotProps={{
                                paper: {
                                    sx: {
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid var(--sky-border)",
                                        boxShadow: "0 4px 12px var(--sky-shadow)",
                                        borderRadius: "12px",
                                        mt: 1,
                                        "& .MuiMenuItem-root": {
                                            color: "var(--sky-text-primary)",
                                            borderRadius: "8px",
                                            margin: "4px 8px",
                                            "&:hover": {
                                                backgroundColor: "rgba(135, 206, 235, 0.1)",
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={handleDashboard}>
                                <DashboardIcon sx={{ mr: 1, color: "var(--sky-primary)" }} />
                                대시보드
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon sx={{ mr: 1, color: "var(--sky-primary)" }} />
                                로그아웃
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleLogin}
                        startIcon={<SmartToyIcon />}
                        sx={{
                            background: "var(--sky-gradient)",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: { xs: 2, sm: 3 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            textTransform: "none",
                            boxShadow: "0 2px 4px var(--sky-shadow)",
                            "&:hover": {
                                background: "linear-gradient(135deg, var(--sky-primary-dark), var(--sky-secondary))",
                                boxShadow: "0 4px 8px var(--sky-shadow)",
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        {isMobile ? "로그인" : "Discord 로그인"}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
