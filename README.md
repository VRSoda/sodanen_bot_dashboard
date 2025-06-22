# Sodanen Bot Dashboard (React + Vite)

Sodanen Discord Bot을 위한 대시보드

## 🛠️ 기술 스택

### Frontend (Client)

-   **React 18**
-   **TypeScript**
-   **Vite**
-   **Material-UI**
-   **Recharts**
-   **Socket.IO Client**

### Backend (Server)

-   **Node.js + Express**
-   **TypeScript**
-   **Passport.js**
-   **Socket.IO**
-   **Sequelize**
-   **Session**

### Database

-   **MariaDB**

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
