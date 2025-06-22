# Sodanen Bot Dashboard (React + Vite)

Sodanen Discord Bot을 위한 현대적인 React 웹 대시보드입니다. 서버 관리자들이 봇의 설정을 관리하고 통계를 확인할 수 있는 웹 인터페이스를 제공합니다.

## 🚀 주요 기능

- **Discord OAuth 인증**: Discord 계정으로 안전한 로그인
- **서버 관리**: 관리 권한이 있는 서버들의 봇 설정 관리
- **실시간 통계**: 명령어 사용 통계, 사용자 활동 분석
- **설정 관리**: 번역 기능, 접두사 등 봇 설정 관리
- **실시간 업데이트**: Socket.IO를 통한 실시간 데이터 업데이트
- **반응형 디자인**: 모바일과 데스크톱 지원

## 🛠️ 기술 스택

### Frontend (Client)
- **React 18**: 최신 React with Hooks
- **TypeScript**: 타입 안전성
- **Vite**: 빠른 빌드 도구
- **Material-UI**: 현대적인 UI 컴포넌트
- **Recharts**: 아름다운 통계 차트
- **Socket.IO Client**: 실시간 통신

### Backend (Server)
- **Node.js + Express**: RESTful API 서버
- **TypeScript**: 서버사이드 타입 안전성
- **Passport.js**: Discord OAuth 인증
- **Socket.IO**: 실시간 통신
- **Sequelize**: MariaDB ORM
- **Session**: 세션 기반 인증

### Database
- **MariaDB**: 기존 봇과 동일한 데이터베이스 사용

## 📁 프로젝트 구조

```
sodanen_bot_dashboard/
├── src/                          # React 프론트엔드
│   ├── components/               # 재사용 가능한 컴포넌트
│   ├── contexts/                 # React 컨텍스트 (Auth, Socket)
│   ├── pages/                    # 페이지 컴포넌트
│   ├── App.tsx                   # 메인 앱 컴포넌트
│   └── main.tsx                  # 엔트리 포인트
├── server/                       # Express 백엔드
│   ├── routes/                   # API 라우트
│   ├── middleware/               # 미들웨어
│   ├── database/                 # 데이터베이스 설정
│   └── server.ts                 # 서버 엔트리 포인트
├── public/                       # 정적 파일
└── dist/                         # 빌드된 파일
```

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 `.env`로 복사하고 필요한 값들을 설정하세요:

```bash
cp .env.example .env
```

### 3. 환경변수 구성

```env
# Discord OAuth 설정
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3001/api/auth/discord/callback

# 데이터베이스 설정
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sodanen_bot

# 서버 설정
PORT=3001
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173

# React 환경변수
VITE_API_URL=http://localhost:3001/api
VITE_DISCORD_CLIENT_ID=your_discord_client_id
```

### 4. Discord 애플리케이션 설정

1. [Discord Developer Portal](https://discord.com/developers/applications)에서 애플리케이션 생성
2. OAuth2 설정에서 Redirect URI 추가: `http://localhost:3001/api/auth/discord/callback`
3. 필요한 스코프: `identify`, `guilds`

### 5. 개발 서버 실행

```bash
# 클라이언트와 서버를 동시에 실행
npm run dev

# 또는 개별 실행
npm run client:dev    # React 개발 서버 (포트 5173)
npm run server:dev    # Express API 서버 (포트 3001)
```

### 6. 프로덕션 빌드

```bash
# 전체 빌드
npm run build

# 클라이언트만 빌드
npm run client:build

# 서버만 빌드
npm run server:build

# 프로덕션 실행
npm start
```

## 📱 사용 방법

### 1. 로그인
- 메인 페이지에서 "Discord로 로그인" 버튼 클릭
- Discord OAuth를 통해 인증

### 2. 서버 관리
- 대시보드에서 관리 권한이 있는 서버 목록 확인
- 서버 카드에서 "관리" 버튼 클릭

### 3. 통계 확인
- 서버별 명령어 사용 통계
- 실시간 활동 로그
- 사용자 활동 분석

### 4. 설정 관리
- 봇 접두사 설정
- 번역 기능 활성화/비활성화
- 언어 설정 및 제외 채널 설정

## 🔧 개발 가이드

### API 엔드포인트

```
GET  /api/auth/status              # 인증 상태 확인
GET  /api/auth/discord             # Discord OAuth 시작
GET  /api/auth/discord/callback    # OAuth 콜백
POST /api/auth/logout              # 로그아웃

GET  /api/dashboard/guilds         # 서버 목록
GET  /api/dashboard/guilds/:id     # 특정 서버 정보
GET  /api/dashboard/guilds/:id/stats # 서버 통계

GET  /api/health                   # 헬스 체크
GET  /api/bot/status              # 봇 상태
```

### 새로운 페이지 추가

1. `/src/pages/`에 새 컴포넌트 생성
2. `/src/App.tsx`에 라우트 추가
3. 필요시 API 엔드포인트 추가

### 새로운 API 엔드포인트 추가

1. `/server/routes/`에 라우트 추가
2. 필요한 미들웨어 적용
3. 클라이언트에서 axios로 호출

## 🔐 보안

- Discord OAuth 2.0 인증
- 세션 기반 인증 관리
- CORS 설정으로 도메인 제한
- 서버 관리 권한 확인
- API 키를 통한 봇-대시보드 간 통신 보안

## 🚀 배포

### Docker를 이용한 배포

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci --only=production

# 앱 복사 및 빌드
COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

### PM2를 이용한 배포

```bash
# PM2 설치
npm install -g pm2

# 빌드
npm run build

# PM2로 시작
pm2 start npm --name "sodanen-dashboard" -- start

# 상태 확인
pm2 status
```

## 🤝 기존 봇과의 연동

1. **동일한 데이터베이스**: 기존 Sodanen Bot의 MariaDB 사용
2. **API 연동**: RESTful API를 통한 봇 설정 변경
3. **실시간 동기화**: Socket.IO를 통한 실시간 업데이트

## 🛠️ 문제 해결

### 자주 발생하는 문제

1. **포트 충돌**
   - 클라이언트: 5173 포트 사용
   - 서버: 3001 포트 사용

2. **CORS 오류**
   - `vite.config.ts`에서 프록시 설정 확인
   - 서버의 CORS 설정 확인

3. **Discord OAuth 오류**
   - Redirect URI가 정확한지 확인
   - Client ID와 Secret 확인

4. **데이터베이스 연결 오류**
   - MariaDB 서비스 실행 확인
   - 환경변수 설정 확인

## 📞 지원

문제가 있거나 기여하고 싶으시면 이슈를 생성해주세요.

---

**Made with ❤️ for Sodanen Bot Community**
