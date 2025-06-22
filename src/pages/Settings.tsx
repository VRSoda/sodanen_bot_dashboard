import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Switch, FormControlLabel, Button, Alert, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel, Grid, Divider, Chip, Stack, ListSubheader } from "@mui/material";
import { useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import apiClient from "../services/apiService";

// Guild 모델의 속성과 일치하는 인터페이스
interface GuildSettings {
    translationEnabled: boolean;
    translationSourceLang: string;
    translationTargetLang: string;
    translationExcludedChannels: string[];
}

interface ChannelGroup {
    label: string;
    options: { id: string; name: string }[];
}

const Settings: React.FC = () => {
    const { guildId } = useParams<{ guildId: string }>();
    const [settings, setSettings] = useState<GuildSettings | null>(null);
    const [channels, setChannels] = useState<ChannelGroup[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!guildId) return;
            try {
                setLoading(true);
                const [settingsRes, channelsRes] = await Promise.all([apiClient.get(`/settings/${guildId}`), apiClient.get(`/discord/channels/${guildId}`)]);

                const settingsData = settingsRes.data;
                if (!Array.isArray(settingsData.translationExcludedChannels)) {
                    settingsData.translationExcludedChannels = [];
                }
                setSettings(settingsData);
                setChannels(channelsRes.data);
            } catch (err) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [guildId]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (!settings) return;

        // 원본/대상 언어 중복 검사
        if (settings.translationSourceLang === settings.translationTargetLang) {
            setValidationError("원본 언어와 대상 언어는 같을 수 없습니다.");
            return;
        } else {
            setValidationError(null);
        }

        setSaving(true);
        const handler = setTimeout(() => {
            const save = async () => {
                if (!guildId) return;
                try {
                    const saveResponse = await apiClient.post(`/settings/${guildId}`, settings);

                    // 서버 응답과 현재 상태가 다를 경우에만 상태를 업데이트하여 무한 루프 방지
                    if (JSON.stringify(saveResponse.data) !== JSON.stringify(settings)) {
                        setSettings(saveResponse.data);
                    }

                    setSuccess("변경사항이 자동 저장되었습니다.");
                    setError(null);
                } catch (err) {
                    setError("자동 저장에 실패했습니다.");
                    console.error(err);
                } finally {
                    setSaving(false);
                    setTimeout(() => setSuccess(null), 3000);
                }
            };
            save();
        }, 1000); // 1초 디바운스

        return () => {
            clearTimeout(handler);
        };
    }, [settings, guildId]);

    const handleSettingChange = (field: keyof GuildSettings, value: any) => {
        if (settings) {
            setSettings({ ...settings, [field]: value });
            // 언어 설정이 변경되면 검증 에러 초기화
            if (field === "translationSourceLang" || field === "translationTargetLang") {
                setValidationError(null);
            }
        }
    };

    const handleAddExcludedChannel = () => {
        if (selectedChannel && settings && !settings.translationExcludedChannels.includes(selectedChannel)) {
            const newExcluded = [...settings.translationExcludedChannels, selectedChannel];
            setSettings({ ...settings, translationExcludedChannels: newExcluded });
            setSelectedChannel("");
        }
    };

    const handleDeleteExcludedChannel = (channelId: string) => {
        if (settings) {
            const newExcluded = settings.translationExcludedChannels.filter((id) => id !== channelId);
            setSettings({ ...settings, translationExcludedChannels: newExcluded });
        }
    };

    const getChannelName = (channelId: string): string => {
        for (const group of channels) {
            const channel = group.options.find((c) => c.id === channelId);
            if (channel) return channel.name;
        }
        return channelId; // 못 찾으면 ID 반환
    };

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    if (error && !settings) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                서버 설정
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {validationError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {validationError}
                </Alert>
            )}

            {settings && (
                <Grid container spacing={4}>
                    {/* 기본 설정 섹션 */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                기본 설정
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                봇의 기본적인 동작을 설정합니다. (현재 설정 항목이 없습니다)
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 번역 설정 섹션 */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                번역 설정
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                자동 번역 기능과 관련된 옵션을 설정합니다.
                            </Typography>
                            <FormControlLabel control={<Switch checked={settings.translationEnabled} onChange={(e) => handleSettingChange("translationEnabled", e.target.checked)} />} label="번역 기능 활성화" sx={{ mb: 2 }} />

                            {/* 번역 제외 채널 설정 */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    번역 제외 채널
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    드롭다운에서 번역을 제외할 채널을 선택하고 추가하세요.
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>채널 선택</InputLabel>
                                        <Select value={selectedChannel} label="채널 선택" onChange={(e) => setSelectedChannel(e.target.value)}>
                                            {channels.map((group) => {
                                                const availableOptions = group.options.filter((channel) => !settings?.translationExcludedChannels.includes(channel.id));

                                                if (availableOptions.length === 0) {
                                                    return null;
                                                }

                                                return [
                                                    <ListSubheader key={group.label}>{group.label}</ListSubheader>,
                                                    ...availableOptions.map((channel) => (
                                                        <MenuItem key={channel.id} value={channel.id}>
                                                            {`# ${channel.name}`}
                                                        </MenuItem>
                                                    )),
                                                ];
                                            })}
                                        </Select>
                                    </FormControl>
                                    <Button onClick={handleAddExcludedChannel} variant="contained" disabled={!selectedChannel}>
                                        추가
                                    </Button>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                                    {settings.translationExcludedChannels.map((channelId) => (
                                        <Chip key={channelId} label={`# ${getChannelName(channelId)}`} onDelete={() => handleDeleteExcludedChannel(channelId)} deleteIcon={<DeleteIcon />} sx={{ mb: 1 }} />
                                    ))}
                                </Stack>
                            </Box>

                            {/* 빠른 설정 옵션 */}
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3, mb: 2 }}>
                                빠른 설정
                            </Typography>
                            <Grid container spacing={1} sx={{ mb: 3 }}>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "ko",
                                                          translationTargetLang: "ja",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        한국어 → 일본어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "ja",
                                                          translationTargetLang: "ko",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        일본어 → 한국어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "ja",
                                                          translationTargetLang: "en",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        일본어 → 영어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "en",
                                                          translationTargetLang: "ja",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        영어 → 일본어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "ko",
                                                          translationTargetLang: "en",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        한국어 → 영어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "en",
                                                          translationTargetLang: "ko",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        영어 → 한국어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "ko",
                                                          translationTargetLang: "zh-CN",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        한국어 → 중국어
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            setSettings((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          translationSourceLang: "zh-CN",
                                                          translationTargetLang: "ko",
                                                      }
                                                    : null
                                            );
                                            setValidationError(null);
                                        }}
                                    >
                                        중국어 → 한국어
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                                수동 설정
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>원본 언어</InputLabel>
                                        <Select label="원본 언어" value={settings.translationSourceLang} onChange={(e) => handleSettingChange("translationSourceLang", e.target.value)}>
                                            <MenuItem value="ko">한국어</MenuItem>
                                            <MenuItem value="en">English</MenuItem>
                                            <MenuItem value="ja">日本語</MenuItem>
                                            <MenuItem value="zh-CN">中文 (간체)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>대상 언어</InputLabel>
                                        <Select label="대상 언어" value={settings.translationTargetLang} onChange={(e) => handleSettingChange("translationTargetLang", e.target.value)}>
                                            <MenuItem value="ko">한국어</MenuItem>
                                            <MenuItem value="en">English</MenuItem>
                                            <MenuItem value="ja">日本語</MenuItem>
                                            <MenuItem value="zh-CN">中文 (간체)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* 권한 설정 섹션 */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                권한 설정
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                명령어별로 사용자 권한을 관리합니다. (현재 준비 중)
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", alignItems: "center", height: "36px" }}>
                {saving ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                            저장 중...
                        </Typography>
                    </>
                ) : success ? (
                    <Typography variant="caption" color="success.main">
                        {success}
                    </Typography>
                ) : error ? (
                    <Typography variant="caption" color="error.main">
                        {error}
                    </Typography>
                ) : !validationError ? (
                    <Typography variant="caption" color="text.secondary">
                        모든 변경사항이 저장되었습니다.
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
};

export default Settings;
