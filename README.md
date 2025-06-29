# 🤖 Sodanen Discord Bot Dashboard - 개발중이에요!

React와 TypeScript, Node.js로 만든 디스코드 봇 관리 대시보드 프로젝트예요!  
실시간 소켓 통신과 직관적인 UI로 디스코드 봇을 쉽게 관리하고 모니터링할 수 있는 웹 대시보드를 제공해요! 😊

## ✨ 프로젝트 기능들!

Sodanen Bot Dashboard가 어떤 기능들을 가지고 있는지 알려드릴게요!

-   🔐 `Discord OAuth 인증 시스템`
    -   Discord 계정으로 안전하게 로그인하고 서버 권한을 확인할 수 있어요.
    -   Discord상 에서 접속시 자동 로그인 시스템을 가지고있어요
-   📊 `실시간 봇 통계 대시보드`
    -   Socket.IO와 MariaDB를 통한 실시간 데이터 업데이트로 봇의 상태와 통계를 실시간으로 모니터링할 수 있어요.
-   🏠 `길드(서버) 관리 시스템`
    -   각 Discord 서버별로 봇 설정을 개별적으로 관리하고 채널별 세부 설정이 가능해요.
-   📢 `공지사항 관리`
    -   대시보드에서 직접 공지사항을 작성하고 관리할 수 있는 기능을 제공해요.
-   🎨 `모던한 반응형 UI/UX`
    -   Material-UI 기반의 아름다운 라이트 테마와 모바일부터 데스크톱까지 완벽한 반응형 디자인이에요.

## 🛠 사용된 기술 스택

이 프로젝트는 최신 풀스택 기술들을 활용해서 만들어졌어요!

#### 프론트엔드

-   React 18.2.0
-   TypeScript 5.2.2
-   Vite 5.0.8
-   Material-UI 5.15.1
-   Recharts 2.8.0 (차트 시각화)
-   Socket.IO Client 4.7.4

#### 백엔드

-   Node.js + Express 4.18.2
-   TypeScript 5.2.2
-   Socket.IO 4.8.1
-   Sequelize 6.37.7 (ORM)
-   Discord.js 14.20.0

#### 데이터베이스 & 인프라

-   MariaDB 11.1
-   Docker & Docker Compose
-   Nginx (프로덕션 환경)

#### 개발 도구

-   ESLint
-   Nodemon
-   Concurrently
-   TSX

## 빠르게 시작하기!

### 1️⃣ 환경 설정

```bash
# 저장소 클론해서 컴퓨터로 가져오기
git clone <repository-url>
cd sodanen_bot_dashboard

# 필요한 의존성 파일들 설치
npm install
```

### 2️⃣ 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가해주세요:

```env
# Discord 애플리케이션 설정
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_bot_token

# 서버 설정
PORT=3001
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret

# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sodanen_bot
DB_USER=root
DB_PASSWORD=1234
```

### 3️⃣ 프로젝트 실행

```bash
# 개발 서버를 시작해요! (프론트엔드 + 백엔드 동시 실행)
npm run dev

# 개별 실행
npm run client:dev    # 프론트엔드만 실행 (포트 5173)
npm run server:dev    # 백엔드만 실행 (포트 3001)

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 📁 프로젝트 구조 살펴보기!

프로젝트가 어떻게 구성되어 있는지 한눈에 볼 수 있도록 정리해봤어요!

```
sodanen_bot_dashboard/
├── src/                                    # 프론트엔드 React 애플리케이션
│   ├── components/                         # 재사용 가능한 UI 컴포넌트들
│   │   ├── Navbar.tsx                      # 네비게이션 바 컴포넌트
│   │   ├── ProtectedRoute.tsx              # 로그인 보호 라우트 컴포넌트
│   │   └── StatCard.tsx                    # 통계 카드 컴포넌트
│   ├── contexts/                           # React 컨텍스트 관리
│   │   ├── AuthContext.tsx                 # 인증 상태 관리
│   │   └── SocketContext.tsx               # Socket.IO 연결 관리
│   ├── pages/                              # 각 페이지의 메인 컴포넌트들
│   │   ├── Home.tsx                        # 홈 페이지 (로그인 화면)
│   │   ├── DashboardLayout.tsx             # 대시보드 레이아웃
│   │   ├── GuildDashboard.tsx              # 길드 관리 페이지
│   │   ├── ChannelDashboard.tsx            # 채널 관리 페이지
│   │   ├── GuildStats.tsx                  # 길드 통계 페이지
│   │   └── Settings.tsx                    # 설정 페이지
│   ├── page/                               # 추가 페이지 컴포넌트들
│   │   ├── Announcements.tsx               # 공지사항 목록 페이지
│   │   └── CreateAnnouncement.tsx          # 공지사항 작성 페이지
│   ├── i18n/                               # 다국어 지원
│   ├── services/                           # API 통신 서비스
│   ├── types.tsx                           # TypeScript 타입 정의
│   ├── App.tsx                             # 메인 앱 컴포넌트
│   └── main.tsx                            # React 앱 진입점
├── server/                                 # Express 백엔드 서버
│   ├── src/                                # 백엔드 소스 코드
│   │   ├── bot/                            # Discord 봇 로직
│   │   └── database/                       # 데이터베이스 연결 및 모델
│   ├── routes/                             # API 라우트 정의
│   │   ├── auth.tsx                        # 인증 관련 라우트
│   │   └── api.tsx                         # 일반 API 라우트
│   ├── middleware/                         # Express 미들웨어
│   └── index.ts                            # 서버 진입점
├── docker/                                 # Docker 설정 파일들
│   └── mariadb/                            # MariaDB 설정
├── nginx/                                  # Nginx 설정 (프로덕션용)
├── public/                                 # 정적 파일들
├── docker-compose.yml                      # 개발 환경 Docker 설정
├── docker-compose.prod.yml                 # 프로덕션 환경 Docker 설정
└── package.json                            # 프로젝트 의존성 및 스크립트
```

## 📊 주요 기능별 상세 설명

Discord 봇 대시보드가 어떤 핵심 기능들을 제공하는지 더 자세히 알려드릴게요!

| 기능 영역                | 주요 내용                    | 상세 설명                                                                                                  |
| ------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **🔐 인증 시스템**       | Discord OAuth 2.0 기반 인증  | • Discord 계정으로 간편 로그인<br>• 서버 권한 자동 확인<br>• 세션 기반 인증 유지<br>• 보호된 라우트 시스템 |
| **📊 실시간 모니터링**   | Socket.IO 기반 실시간 데이터 | • 봇 온라인 상태 실시간 표시<br>• 서버별 멤버 수 모니터링<br>• 명령어 사용 통계<br>• 채팅 활동 통계        |
| **🏠 길드 관리**         | Discord 서버별 개별 관리     | • 서버별 봇 설정 관리<br>• 채널별 세부 권한 설정<br>• 멤버 관리 및 역할 설정<br>• 서버 통계 및 분석        |
| **📢 공지사항 시스템**   | 통합 공지사항 관리           | • 웹에서 직접 공지 작성<br>• 다중 서버 동시 발송<br>• 공지 예약 발송<br>• 공지 이력 관리                   |
| **🎨 사용자 인터페이스** | Material-UI 기반 모던 디자인 | • 하늘색 라이트 테마<br>• 완전 반응형 레이아웃<br>• 직관적인 네비게이션<br>• 아름다운 차트 시각화          |
| **⚙️ 설정 및 구성**      | 유연한 봇 설정 시스템        | • 서버별 개별 설정<br>• 명령어 활성화/비활성화<br>• 권한 레벨 설정<br>• 자동화 규칙 설정                   |
| **🐳 인프라 및 배포**    | Docker 기반 컨테이너화       | • 개발/프로덕션 환경 분리<br>• MariaDB 컨테이너화<br>• Nginx 리버스 프록시<br>• 원클릭 배포                |

## 📋 사용 가능한 스크립트들

프로젝트를 관리할 때 유용하게 쓸 수 있는 명령어들이에요!

```bash
# 개발 관련
npm run dev               # 풀스택 개발 서버 시작 (프론트엔드 + 백엔드)
npm run client:dev        # 프론트엔드만 개발 모드로 실행
npm run server:dev        # 백엔드만 개발 모드로 실행

# 빌드 관련
npm run build             # 프론트엔드와 백엔드 모두 프로덕션 빌드
npm run client:build      # 프론트엔드만 빌드
npm run server:build      # 백엔드만 빌드

# 실행 관련
npm start                 # 프로덕션 서버 시작
npm run client:preview    # 빌드된 프론트엔드 미리보기

# 코드 품질
npm run lint              # ESLint로 코드 품질 검사

# Docker 관련
docker-compose up -d      # 개발환경 데이터베이스 시작
docker-compose -f docker-compose.prod.yml up -d  # 프로덕션 환경 배포
```

## 🔧 환경별 설정

### 개발 환경

-   프론트엔드: http://localhost:5173
-   백엔드: http://localhost:3001
-   MariaDB: localhost:3306

### 프로덕션 환경

-   Docker Compose 기반 완전 컨테이너화
-   Nginx 리버스 프록시
-   자동 SSL 인증서 (Let's Encrypt)
-   데이터베이스 볼륨 영속화

## 🏗 아키텍처 개요

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express Server │    │   Discord Bot   │
│                 │    │                 │    │                 │
│  • Material-UI  │◄──►│  • REST API     │◄──►│  • Discord.js   │
│  • Socket.IO    │    │  • Socket.IO    │    │  • Event Handler│
│  • Charts       │    │  • Passport.js  │    │  • Commands     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│    MariaDB      │◄─────────────┘
                         │                 │
                         │  • User Data    │
                         │  • Guild Config │
                         │  • Statistics   │
                         └─────────────────┘
```

## 🚀 배포 가이드

### Docker를 사용한 프로덕션 배포

```bash
# 1. 환경 변수 설정
cp .env.example .env
# .env 파일 편집

# 2. 프로덕션 빌드 및 배포
docker-compose -f docker-compose.prod.yml up -d --build

# 3. 로그 확인
docker-compose -f docker-compose.prod.yml logs -f
```

## 🤝 프로젝트에 기여하기

1. 이 저장소를 Fork 해주세요!
2. 새로운 기능 브랜치를 만들어주세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋해주세요 (`git commit -m 'Add amazing feature'`)
4. 만든 브랜치에 코드를 푸시해주세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하면 검토해볼게요!

## 📄 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포돼요.

---

## 📞 문의사항

프로젝트를 사용하거나 개발하다가 문제가 생기거나 궁금한 점이 있다면 언제든지 물어봐 주세요!

-   📧 **이메일**: sodanen@sodanen.com
-   💬 **Discord**: Sodanen (여기가 제일 응답이 빨라요!)
