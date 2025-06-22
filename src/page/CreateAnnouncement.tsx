import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import apiClient from "../services/apiService";

const CreateAnnouncement: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!title.trim() || !content.trim()) {
            setError("제목과 내용은 비워둘 수 없습니다.");
            return;
        }

        setIsSubmitting(true);
        try {
            await apiClient.post("/api/announcements", { title, content });
            navigate("/dashboard/announcements");
        } catch (err: any) {
            setError(err.response?.data?.message || "공지사항 작성에 실패했습니다.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box maxWidth="md" mx="auto">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                새 공지사항 작성
            </Typography>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, borderRadius: "16px" }}>
                <Stack spacing={3}>
                    <TextField label="제목" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required variant="outlined" />
                    <TextField label="내용" value={content} onChange={(e) => setContent(e.target.value)} fullWidth required multiline rows={12} variant="outlined" placeholder="공지 내용을 입력하세요. 마크다운 문법을 지원할 예정입니다." />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => navigate("/dashboard/announcements")} disabled={isSubmitting}>
                            취소
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={isSubmitting}>
                            {isSubmitting ? "등록 중..." : "등록하기"}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default CreateAnnouncement;
