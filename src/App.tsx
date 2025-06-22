import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import background from "./assets/background.png";

// Pages
import Home from "./pages/Home";
import DashboardLayout from "./pages/DashboardLayout";
import GuildDashboard from "./pages/GuildDashboard";
import ChannelDashboard from "./pages/ChannelDashboard";
import Settings from "./pages/Settings";
import GuildStats from "./pages/GuildStats";
import ProtectedRoute from "./components/ProtectedRoute";
import Announcements from "./page/Announcements";
import CreateAnnouncement from "./page/CreateAnnouncement";

// 하늘색 라이트 테마 정의
const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#00A9FF", // 주 색상 (하늘색)
        },
        secondary: {
            main: "#FF6B6B", // 보조 색상 (포인트)
        },
        background: {
            default: "#F0F8FF", // 기본 배경 (매우 연한 하늘색)
            paper: "#FFFFFF", // 카드 배경 (흰색)
        },
        text: {
            primary: "#2C3E50", // 주 텍스트 (어두운 회색)
            secondary: "#576574", // 보조 텍스트 (회색)
        },
    },
    typography: {
        fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // Paper 컴포넌트의 backgroundImage 초기화
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
                    borderRadius: "16px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    backdropFilter: "none",
                    border: "1px solid #E0E0E0",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.08)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                    fontWeight: "bold",
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                body {
                    background-image: none;
                    background-color: #F0F8FF;
                }
            `,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <AuthProvider>
                <SocketProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route path="announcements" element={<Announcements />} />
                                <Route path="announcements/new" element={<CreateAnnouncement />} />
                                <Route path="guild/:guildId" element={<GuildDashboard />} />
                                <Route path="guild/:guildId/channel/:channelId" element={<ChannelDashboard />} />
                                <Route path="guild/:guildId/stats" element={<GuildStats />} />
                                <Route path="guild/:guildId/settings" element={<Settings />} />
                                {/* 잘못된 경로 에 대한 리다이렉트 */}
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Route>
                        </Routes>
                    </Router>
                </SocketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
