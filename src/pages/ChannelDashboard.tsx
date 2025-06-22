import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Chip,
    Alert,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {
    ChatBubble as MessageSquareIcon,
    People as UsersIcon,
    TrendingUp as ActivityIcon,
    Settings as SettingsIcon,
    Tag as HashIcon,
    Schedule as ClockIcon,
    TrendingUp,
} from '@mui/icons-material';

interface ChannelData {
    id: string;
    name: string;
    type: number;
    topic?: string;
    memberCount?: number;
    messageCount?: number;
    lastActivity?: string;
}

interface ChannelStats {
    totalMessages: number;
    activeUsers: number;
    lastHour: number;
    last24Hours: number;
    topUsers: Array<{
        username: string;
        messageCount: number;
    }>;
}

const ChannelDashboard: React.FC = () => {
    const { guildId, channelId } = useParams<{ guildId: string; channelId: string }>();
    const [channelData, setChannelData] = useState<ChannelData | null>(null);
    const [channelStats, setChannelStats] = useState<ChannelStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChannelData = async () => {
            if (!guildId || !channelId) return;

            try {
                setLoading(true);
                
                // API 호출 시뮬레이션 (실제 API 엔드포인트로 교체 필요)
                // const response = await fetch(`/api/guild/${guildId}/channel/${channelId}`);
                // const data = await response.json();
                
                // 임시 데이터
                const mockChannelData: ChannelData = {
                    id: channelId,
                    name: '일반',
                    type: 0,
                    topic: '서버의 일반적인 대화를 위한 채널입니다.',
                    memberCount: 245,
                    messageCount: 1542,
                    lastActivity: new Date().toISOString(),
                };

                const mockStats: ChannelStats = {
                    totalMessages: 1542,
                    activeUsers: 45,
                    lastHour: 12,
                    last24Hours: 89,
                    topUsers: [
                        { username: 'User1', messageCount: 45 },
                        { username: 'User2', messageCount: 32 },
                        { username: 'User3', messageCount: 28 },
                    ]
                };

                setChannelData(mockChannelData);
                setChannelStats(mockStats);
            } catch (err) {
                setError('채널 정보를 불러오는 중 오류가 발생했습니다.');
                console.error('Channel data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChannelData();
    }, [guildId, channelId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!channelData) {
        return (
            <Alert severity="warning" sx={{ mt: 2 }}>
                채널 정보를 찾을 수 없습니다.
            </Alert>
        );
    }

    const getChannelTypeLabel = (type: number) => {
        switch (type) {
            case 0: return '텍스트';
            case 2: return '음성';
            case 4: return '카테고리';
            case 5: return '뉴스';
            case 13: return '스테이지';
            default: return '알 수 없음';
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* 채널 헤더 */}
            <Box sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <HashIcon sx={{ fontSize: 24 }} />
                    <Typography variant="h4" component="h1">
                        {channelData.name}
                    </Typography>
                    <Chip 
                        label={getChannelTypeLabel(channelData.type)} 
                        color="primary" 
                        size="small" 
                    />
                </Box>
                {channelData.topic && (
                    <Typography variant="body2" color="text.secondary">
                        {channelData.topic}
                    </Typography>
                )}
            </Box>

            {/* 통계 카드들 */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <MessageSquareIcon color="primary" sx={{ fontSize: 24 }} />
                                <Box>
                                    <Typography variant="h6">
                                        {channelStats?.totalMessages || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        총 메시지
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <UsersIcon color="primary" sx={{ fontSize: 24 }} />
                                <Box>
                                    <Typography variant="h6">
                                        {channelStats?.activeUsers || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        활성 사용자
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <ClockIcon color="primary" sx={{ fontSize: 24 }} />
                                <Box>
                                    <Typography variant="h6">
                                        {channelStats?.lastHour || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        지난 1시간
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <TrendingUp color="primary" sx={{ fontSize: 24 }} />
                                <Box>
                                    <Typography variant="h6">
                                        {channelStats?.last24Hours || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        지난 24시간
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 상세 정보 */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                채널 활동
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                최근 활동: {channelData.lastActivity ? 
                                    new Date(channelData.lastActivity).toLocaleString('ko-KR') : 
                                    '정보 없음'
                                }
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2">
                                이 채널의 상세한 활동 분석 및 차트가 여기에 표시됩니다.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                활성 사용자 TOP 3
                            </Typography>
                            <List>
                                {channelStats?.topUsers.map((user, index) => (
                                    <ListItem key={index} divider={index < channelStats.topUsers.length - 1}>
                                        <ListItemIcon>
                                            <Typography variant="body2" color="primary">
                                                #{index + 1}
                                            </Typography>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={user.username}
                                            secondary={`${user.messageCount}개 메시지`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 액션 버튼들 */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<SettingsIcon sx={{ fontSize: 20 }} />}
                    onClick={() => {
                        // 채널 설정 페이지로 이동
                        console.log('Navigate to channel settings');
                    }}
                >
                    채널 설정
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ActivityIcon sx={{ fontSize: 20 }} />}
                    onClick={() => {
                        // 상세 분석 페이지로 이동
                        console.log('Navigate to detailed analytics');
                    }}
                >
                    상세 분석
                </Button>
            </Box>
        </Box>
    );
};

export default ChannelDashboard;
