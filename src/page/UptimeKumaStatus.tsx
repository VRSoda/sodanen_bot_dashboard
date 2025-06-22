import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper, Card, CardContent, Chip, CircularProgress, Fade, Grid, Alert, LinearProgress } from "@mui/material";
import { Computer as ServerIcon, CheckCircle as CheckIcon, Error as ErrorIcon, Warning as WarningIcon, Info as InfoIcon, Speed as SpeedIcon, Timeline as UptimeIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import apiClient from "../services/apiService"; // apiClient 임포트

// 스타일드 컴포넌트
const StatusCard = styled(Card)(({ theme, status }: { theme?: any; status: "online" | "offline" | "warning" }) => ({
    borderRadius: theme.spacing(2),
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `2px solid ${status === "online" ? theme.palette.success.main : status === "warning" ? theme.palette.warning.main : theme.palette.error.main}`,
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[8],
    },
}));

const StatusIndicator = styled(Box)(({ theme, status }: { theme?: any; status: "online" | "offline" | "warning" }) => ({
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: status === "online" ? theme.palette.success.main : status === "warning" ? theme.palette.warning.main : theme.palette.error.main,
    boxShadow: `0 0 0 4px ${status === "online" ? theme.palette.success.light : status === "warning" ? theme.palette.warning.light : theme.palette.error.light}40`,
    animation: "pulse 2s infinite",
    "@keyframes pulse": {
        "0%": {
            boxShadow: `0 0 0 0px ${status === "online" ? theme.palette.success.main : status === "warning" ? theme.palette.warning.main : theme.palette.error.main}40`,
        },
        "70%": {
            boxShadow: `0 0 0 10px ${status === "online" ? theme.palette.success.main : status === "warning" ? theme.palette.warning.main : theme.palette.error.main}00`,
        },
        "100%": {
            boxShadow: `0 0 0 0px ${status === "online" ? theme.palette.success.main : status === "warning" ? theme.palette.warning.main : theme.palette.error.main}00`,
        },
    },
}));

const OverallStatusCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    marginBottom: theme.spacing(4),
    textAlign: "center",
}));

interface ServiceStatus {
    id: string;
    name: string;
    status: "online" | "offline" | "warning";
    responseTime: number;
    uptime: number;
    lastChecked: string;
    description: string;
}

const UptimeKumaStatus: React.FC = () => {
    const [services, setServices] = useState<ServiceStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // 서비스 상태 데이터 가져오기
    useEffect(() => {
        const fetchServiceStatus = async () => {
            try {
                setLoading(true)서비스 상태 API 호출
                const response = await apiClient.get("/api/services/status");
                setServices(response.data);

                setLoading(false);
            } catch (error) {
                console.error("서비스 상태 로드 오류:", error);
                // 에러 발생 시 기본 서비스 상태 표시
                const fallbackServices: ServiceStatus[] = [
                    {
                        id: "1",
                        name: "Discord Bot",
                        status: "warning",
                        responseTime: 0,
                        uptime: 0,
                        lastChecked: new Date().toISOString(),
                        description: "연결 확인 중...",
                    },
                ];
                setServices(fallbackServices);
                setLoading(false);
            }
        };

        fetchServiceStatus();
    }, []);

    const getStatusIcon = (status: "online" | "offline" | "warning") => {
        switch (status) {
            case "online":
                return <CheckIcon sx={{ color: "success.main" }} />;
            case "warning":
                return <WarningIcon sx={{ color: "warning.main" }} />;
            case "offline":
                return <ErrorIcon sx={{ color: "error.main" }} />;
            default:
                return <InfoIcon />;
        }
    };

    const getStatusText = (status: "online" | "offline" | "warning") => {
        switch (status) {
            case "online":
                return "정상";
            case "warning":
                return "주의";
            case "offline":
                return "오프라인";
            default:
                return "알 수 없음";
        }
    };

    const getStatusColor = (status: "online" | "offline" | "warning") => {
        switch (status) {
            case "online":
                return "success";
            case "warning":
                return "warning";
            case "offline":
                return "error";
            default:
                return "default";
        }
    };

    const getOverallStatus = () => {
        const onlineCount = services.filter((s) => s.status === "online").length;
        const totalCount = services.length;

        if (onlineCount === totalCount) return { status: "online", text: "모든 서비스 정상" };
        if (onlineCount > 0) return { status: "warning", text: "일부 서비스 문제" };
        return { status: "offline", text: "서비스 중단" };
    };

    const formatLastChecked = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
        return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                            서비스 상태를 확인하는 중...
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    }

    const overallStatus = getOverallStatus();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Fade in={isVisible} timeout={800}>
                <Box>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <ServerIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "text.primary" }}>
                            서비스 상태
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            실시간 서비스 모니터링 현황
                        </Typography>
                    </Box>

                    {/* 전체 상태 카드 */}
                    <OverallStatusCard elevation={4}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                            <StatusIndicator status={overallStatus.status as any} sx={{ mr: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                {overallStatus.text}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            {services.filter((s) => s.status === "online").length} / {services.length} 서비스 운영 중
                        </Typography>
                    </OverallStatusCard>

                    {/* 서비스 목록 */}
                    <Grid container spacing={3}>
                        {services.map((service, index) => (
                            <Grid item xs={12} md={6} key={service.id}>
                                <Fade in={isVisible} timeout={800 + index * 100}>
                                    <StatusCard status={service.status} elevation={3}>
                                        <CardContent sx={{ p: 3 }}>
                                            {/* 서비스 헤더 */}
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                                                    {getStatusIcon(service.status)}
                                                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                                                        {service.name}
                                                    </Typography>
                                                </Box>
                                                <Chip label={getStatusText(service.status)} color={getStatusColor(service.status) as any} size="small" sx={{ fontWeight: 600 }} />
                                            </Box>

                                            {/* 서비스 설명 */}
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                {service.description}
                                            </Typography>

                                            {/* 메트릭스 */}
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                                                        <SpeedIcon sx={{ color: "primary.main", mb: 1 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {service.responseTime}ms
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            응답 시간
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                                                        <UptimeIcon sx={{ color: "success.main", mb: 1 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {service.uptime}%
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            가동률
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            {/* 업타임 프로그레스 바 */}
                                            <Box sx={{ mt: 2 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        30일 가동률
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {service.uptime}%
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={service.uptime}
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 4,
                                                        backgroundColor: "grey.200",
                                                        "& .MuiLinearProgress-bar": {
                                                            borderRadius: 4,
                                                            backgroundColor: service.uptime > 99 ? "success.main" : service.uptime > 95 ? "warning.main" : "error.main",
                                                        },
                                                    }}
                                                />
                                            </Box>

                                            {/* 마지막 확인 시간 */}
                                            <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: "block" }}>
                                                마지막 확인: {formatLastChecked(service.lastChecked)}
                                            </Typography>
                                        </CardContent>
                                    </StatusCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>

                    {/* 알림 메시지 */}
                    <Box sx={{ mt: 4 }}>
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                            <Typography variant="body2">이 페이지는 5분마다 자동으로 업데이트됩니다. 문제가 지속되거나 추가 지원이 필요한 경우 문의하세요.</Typography>
                        </Alert>
                    </Box>
                </Box>
            </Fade>
        </Container>
    );
};

export default UptimeKumaStatus;
