import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Fade,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import {
    Article as ArticleIcon,
    Circle as CircleIcon,
    Gavel as GavelIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// 스타일드 컴포넌트
const TermsContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    borderRadius: theme.spacing(3),
    boxShadow: theme.shadows[4],
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(4),
    '&:first-of-type': {
        marginTop: 0,
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
}));

const ContentBox = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    lineHeight: 1.8,
    color: theme.palette.text.primary,
}));

const TableContainer_Styled = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
}));

const FooterBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(6),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    border: `1px solid ${theme.palette.divider}`,
}));

const TermsOfService = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const renderTable = (data: Array<{ col1: string; col2: string; col3?: string }>, headers: string[]) => (
        <TableContainer_Styled>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                        {headers.map((header, index) => (
                            <TableCell key={index} sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                            <TableCell>{row.col1}</TableCell>
                            <TableCell>{row.col2}</TableCell>
                            {row.col3 && <TableCell>{row.col3}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer_Styled>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Fade in={isVisible} timeout={800}>
                <Box>
                    {/* 헤더 */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <GavelIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{ fontWeight: 'bold', color: 'text.primary' }}
                        >
                            이용약관
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            개인정보 보호 및 서비스 이용에 관한 약관
                        </Typography>
                    </Box>

                    <TermsContainer elevation={3}>
                        {/* 제1조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제1조 (목적)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                본 약관은 Sodanen_Bot(이하 "회사"라 합니다)이 제공하고자 하는 서비스(이하 "서비스")를 이용하는 개인(이하 "이용자"또는 "개인")의 정보(이하 "개인정보")를
                                보호하기위해, 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 "정보통신망법") 등 관련 법령을 준수하고, 서비스 이용자의 개인정보
                                보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침(이하 "본 방침")을 수립합니다.
                            </Typography>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제2조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제2조 (개인정보 처리의 원칙)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수
                                있습니다. 단 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제 3자에게 제공할 수도 있습니다.
                            </Typography>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제5조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제5조 (회사 서비스 제공을 위한 정보)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.
                            </Typography>
                            {renderTable([
                                { col1: '사용자의 고유 아이디', col2: '서비스 제공 및 사용자 식별' },
                                { col1: '서비스가 설치된 서버의 메시지 로그', col2: '서비스 제공 및 문제 해결' }
                            ], ['수집 정보', '목적'])}
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제10조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제10조 (개인정보의 처리 위탁)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                회사는 원활한 서비스 제공과 효과적인 업무 처리를 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다.
                            </Typography>
                            {renderTable([
                                { col1: 'Amazon Web Services, Inc.', col2: '음성 합성 서비스 (TTS)', col3: '서비스 이용 시 즉시 종료' },
                                { col1: '네이버클라우드(주)', col2: '파파고 번역 (Papago)', col3: '서비스 이용 시 즉시 종료' }
                            ], ['수탁업체', '위탁 업무 내용', '위탁 기간'])}
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제12조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제12조 (개인정보 보유 및 이용기간)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 이용자의 개인정보에 대해 개인정보의 수집 및 이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용 기록은 부정 서비스 이용 및 이용 방지를 위해 서비스 이용 종료 시점으로부터 최대 1개월간 보관합니다." />
                                </ListItem>
                            </List>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제17조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제17조 (회사의 개인정보 관리)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 아니하도록 안정성을 확보하기 위하여 필요한 기술적 및 관리 보호
                                대책을 강구하고 있습니다.
                            </Typography>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제19조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제19조 (해킹 등에 대비한 대책)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출 되거나 훼손되는걸 막기 위해 최선을 다하고 있습니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 최신 기술을 이용하여 이용자들의 개인정보 또는 자료가 유출 또는 손상 되지 않도록 방지하고 있습니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 만일의 사태에 대비하여 차단 시스템을 이용하여 보안에 최선을 다하고 있습니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 민감한 개인정보 네트워크 상에서의 개인정보를 안전하게 전송 할 수 있도록 하고 있습니다." />
                                </ListItem>
                            </List>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제20조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제20조 (개인정보 유출 등에 대한 조치)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                회사는 개인정보의 분실 및 도난 유출(이하 "유출 등"이라한다) 사실을 안 때에는 다음 각 호의 모든 사항을 해당 이용자에게 알리고 모든 사용자 및 공지사항으로
                                해당사실을 신고합니다.
                            </Typography>
                            {renderTable([
                                { col1: '유출 등이 된 개인정보 항목', col2: '유출된 개인정보의 종류' },
                                { col1: '유출 등이 발생한 시점', col2: '유출 발생 시간' },
                                { col1: '이용자가 취할 수 있는 조치', col2: '유출에 대응하기 위한 사용자 가이드' },
                                { col1: '이용자가 상담 등을 접수 할 수 있는 연락처', col2: '관련 문의 연락처 정보' }
                            ], ['알림 내용', '설명'])}
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 제22조 */}
                        <SectionHeader>
                            <ArticleIcon color="primary" />
                            <SectionTitle variant="h5">제22조 (권익침해에 대한 구제방법)</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="정보주체는 개인정보 침해로 인한 구제를 받기 위하여 대한민국의 국민은 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="회사는 정보주체의 개인정보자기결정권을 보장하고 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 담당 관리자로 연락해주시기 바랍니다." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="개인정보 보호법 제35조(개인정보의 열람), 제36조(개인정보의 정정 및 삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다"
                                        secondary="중앙행정심판위원회 : (국번없이) 110 www.simpan.go.kr"
                                    />
                                </ListItem>
                            </List>
                        </ContentBox>

                        <Divider sx={{ my: 3 }} />

                        {/* 부칙 */}
                        <SectionHeader>
                            <GavelIcon color="primary" />
                            <SectionTitle variant="h5">부칙</SectionTitle>
                        </SectionHeader>
                        <ContentBox>
                            <Typography paragraph>
                                본 약관은 2025년 4월 12일부터 시행됩니다.
                            </Typography>
                        </ContentBox>

                        {/* 시행일자 */}
                        <FooterBox>
                            <Chip 
                                label="시행일자: 2025년 4월 12일" 
                                color="primary" 
                                variant="outlined"
                                sx={{ 
                                    fontSize: '1rem', 
                                    fontWeight: 600,
                                    py: 2,
                                    px: 3
                                }}
                            />
                        </FooterBox>
                    </TermsContainer>
                </Box>
            </Fade>
        </Container>
    );
};

export default TermsOfService;
