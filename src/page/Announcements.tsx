import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Chip, Stack, Divider, Button, CircularProgress, Alert } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiService";

interface Announcement {
    id: number;
    title: string;
    content: string;
    authorId?: string;
    authorName?: string;
    createdAt: string;
    updatedAt: string;
}

const Announcements: React.FC = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get("/announcements");
            setAnnouncements(response.data);
        } catch (err: any) {
            setError("공지사항을 불러오는 데 실패했습니다.");
            console.error("Error fetching announcements:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <CampaignIcon color="primary" sx={{ fontSize: 48, mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                        공지사항
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        봇과 대시보드의 최신 소식을 확인하세요.
                    </Typography>
                </Box>
                {/* TODO: 관리자만 보이도록 조건부 렌더링 필요 */}
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/dashboard/announcements/new")} sx={{ flexShrink: 0 }}>
                    새 글 작성
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {announcements.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px" }}>
                    <CampaignIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        아직 공지사항이 없습니다
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        첫 번째 공지사항을 작성해보세요!
                    </Typography>
                </Paper>
            ) : (
                <Stack spacing={3}>
                    {announcements.map((announcement) => (
                        <Paper key={announcement.id} sx={{ p: 3, borderRadius: "16px" }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                                    {announcement.title}
                                </Typography>
                                <Chip label="공지" color="primary" size="small" sx={{ ml: 2 }} />
                            </Box>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: "text.secondary" }}>
                                {announcement.content}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(announcement.createdAt)}
                                    </Typography>
                                </Box>
                                {announcement.authorName && (
                                    <Typography variant="caption" color="text.secondary">
                                        작성자: {announcement.authorName}
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default Announcements;
