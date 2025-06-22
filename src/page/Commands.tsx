import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Chip,
    Fade,
    Collapse,
    Divider
} from '@mui/material';
import {
    Settings as SettingsIcon,
    Security as SecurityIcon,
    MusicNote as MusicIcon,
    Translate as TranslateIcon,
    Code as CodeIcon,
    ExpandLess,
    ExpandMore
} from '@mui/icons-material';

interface Command {
    name: string;
    description: string;
    example: string;
    category: string;
}

const categoryIcons: { [key: string]: React.ComponentType } = {
    일반: SettingsIcon,
    관리: SecurityIcon,
    음악: MusicIcon,
    번역: TranslateIcon,
};

const categoryColors: { [key: string]: "primary" | "secondary" | "error" | "warning" | "info" | "success" } = {
    일반: "primary",
    관리: "error",
    음악: "secondary",
    번역: "info",
};

const Commands: React.FC = () => {
    const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const commands: Command[] = [
        {
            name: "/help",
            description: "봇의 모든 명령어와 사용법을 확인할 수 있습니다.",
            example: "/help",
            category: "일반",
        },
        {
            name: "/ping",
            description: "봇의 응답 속도를 측정합니다.",
            example: "/ping",
            category: "일반",
        },
        {
            name: "/kick",
            description: "지정된 사용자를 서버에서 추방합니다.",
            example: "/kick @사용자 [사유]",
            category: "관리",
        },
        {
            name: "/ban",
            description: "지정된 사용자를 서버에서 밴합니다.",
            example: "/ban @사용자 [사유]",
            category: "관리",
        },
        {
            name: "/play",
            description: "음성 채널에서 음악을 재생합니다.",
            example: "/play 노래제목",
            category: "음악",
        },
        {
            name: "/skip",
            description: "현재 재생 중인 음악을 건너뜁니다.",
            example: "/skip",
            category: "음악",
        },
        {
            name: "/translate",
            description: "텍스트를 지정된 언어로 번역합니다.",
            example: "/translate en 안녕하세요",
            category: "번역",
        },
    ];

    const categories = ["일반", "관리", "음악", "번역"];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleCommandClick = (command: Command) => {
        setSelectedCommand(command);
    };

    const handleCategoryClick = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <Container maxWidth="xl">
            <Fade in={isVisible} timeout={800}>
                <Box sx={{ py: 4 }}>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom 
                        align="center"
                        sx={{ 
                            fontWeight: 'bold', 
                            color: 'primary.main',
                            mb: 4
                        }}
                    >
                        봇 명령어
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {/* 명령어 목록 사이드바 */}
                        <Grid item xs={12} md={4}>
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    height: 'fit-content'
                                }}
                            >
                                <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                        명령어 목록
                                    </Typography>
                                </Box>
                                
                                <List sx={{ p: 2 }}>
                                    {categories.map((category) => {
                                        const Icon = categoryIcons[category] || CodeIcon;
                                        const categoryCommands = commands.filter(cmd => cmd.category === category);
                                        const isExpanded = expandedCategory === category;
                                        
                                        return (
                                            <Box key={category}>
                                                <ListItem disablePadding>
                                                    <ListItemButton
                                                        onClick={() => handleCategoryClick(category)}
                                                        sx={{
                                                            borderRadius: 2,
                                                            mb: 1,
                                                            bgcolor: isExpanded ? `${categoryColors[category]}.light` : 'transparent',
                                                            color: isExpanded ? 'white' : 'inherit',
                                                            '&:hover': {
                                                                bgcolor: `${categoryColors[category]}.light`,
                                                                color: 'white',
                                                            }
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                                            <Icon />
                                                        </ListItemIcon>
                                                        <ListItemText 
                                                            primary={category}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                        <Chip 
                                                            label={categoryCommands.length}
                                                            size="small"
                                                            color={categoryColors[category]}
                                                            sx={{ mr: 1 }}
                                                        />
                                                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItemButton>
                                                </ListItem>
                                                
                                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {categoryCommands.map((command) => (
                                                            <ListItem key={command.name} disablePadding>
                                                                <ListItemButton
                                                                    onClick={() => handleCommandClick(command)}
                                                                    sx={{
                                                                        pl: 6,
                                                                        borderRadius: 2,
                                                                        mx: 1,
                                                                        mb: 0.5,
                                                                        bgcolor: selectedCommand?.name === command.name ? 'action.selected' : 'transparent',
                                                                        '&:hover': {
                                                                            bgcolor: 'action.hover',
                                                                        }
                                                                    }}
                                                                >
                                                                    <ListItemText 
                                                                        primary={command.name}
                                                                        sx={{ 
                                                                            '& .MuiListItemText-primary': {
                                                                                fontFamily: 'monospace',
                                                                                fontWeight: 600,
                                                                                color: 'primary.main'
                                                                            }
                                                                        }}
                                                                    />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Collapse>
                                            </Box>
                                        );
                                    })}
                                </List>
                            </Paper>
                        </Grid>

                        {/* 명령어 상세 정보 */}
                        <Grid item xs={12} md={8}>
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    borderRadius: 3,
                                    minHeight: 400,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {selectedCommand ? (
                                    <Fade in={!!selectedCommand} timeout={500}>
                                        <Box sx={{ p: 4, height: '100%' }}>
                                            <Box sx={{ mb: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Typography 
                                                        variant="h3" 
                                                        component="h2"
                                                        sx={{ 
                                                            fontFamily: 'monospace',
                                                            color: 'primary.main',
                                                            fontWeight: 'bold',
                                                            mr: 2
                                                        }}
                                                    >
                                                        {selectedCommand.name}
                                                    </Typography>
                                                    <Chip 
                                                        label={selectedCommand.category}
                                                        color={categoryColors[selectedCommand.category]}
                                                        icon={React.createElement(categoryIcons[selectedCommand.category] || CodeIcon)}
                                                    />
                                                </Box>
                                            </Box>

                                            <Divider sx={{ mb: 3 }} />

                                            <Card 
                                                variant="outlined" 
                                                sx={{ 
                                                    mb: 3,
                                                    bgcolor: 'grey.50',
                                                    borderRadius: 2
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography 
                                                        variant="h6" 
                                                        gutterBottom
                                                        sx={{ 
                                                            color: 'text.secondary',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        📖 설명
                                                    </Typography>
                                                    <Typography 
                                                        variant="body1"
                                                        sx={{ 
                                                            lineHeight: 1.7,
                                                            color: 'text.primary'
                                                        }}
                                                    >
                                                        {selectedCommand.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            <Card 
                                                variant="outlined"
                                                sx={{ 
                                                    bgcolor: 'primary.light',
                                                    color: 'white',
                                                    borderRadius: 2
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography 
                                                        variant="h6" 
                                                        gutterBottom
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        💡 사용 예시
                                                    </Typography>
                                                    <Box 
                                                        sx={{ 
                                                            bgcolor: 'rgba(0,0,0,0.2)',
                                                            p: 2,
                                                            borderRadius: 1,
                                                            fontFamily: 'monospace'
                                                        }}
                                                    >
                                                        <Typography 
                                                        component="code"
                                                        sx={{ 
                                                        fontFamily: 'monospace',
                                                        fontSize: '1.1rem'
                                                        }}
                                                        >
                                                            {selectedCommand.example}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Fade>
                                ) : (
                                    <Box 
                                        sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            p: 4,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Box>
                                            <CodeIcon 
                                                sx={{ 
                                                    fontSize: 80,
                                                    color: 'text.disabled',
                                                    mb: 2
                                                }}
                                            />
                                            <Typography 
                                                variant="h5" 
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                명령어를 선택하세요
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="text.disabled"
                                            >
                                                왼쪽 목록에서 명령어를 클릭하면 자세한 정보를 확인할 수 있습니다.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Container>
    );
};

export default Commands;
