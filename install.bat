@echo off
title Sodanen Bot Dashboard 설치

echo 🚀 Sodanen Bot Dashboard 설치를 시작합니다...
echo.

:: Node.js 버전 확인
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js가 설치되어 있지 않습니다.
    echo Node.js 16 이상을 설치한 후 다시 실행해주세요.
    pause
    exit /b 1
)

echo ✅ Node.js 버전 확인 완료
node -v

:: npm 의존성 설치
echo.
echo 📦 의존성을 설치하는 중...
npm install

if %errorlevel% neq 0 (
    echo ❌ 의존성 설치에 실패했습니다.
    pause
    exit /b 1
)

echo ✅ 의존성 설치 완료

:: 환경변수 파일 설정
if not exist ".env" (
    echo.
    echo ⚙️ 환경변수 파일을 생성하는 중...
    copy ".env.example" ".env"
    echo ✅ .env 파일이 생성되었습니다.
    echo 📝 .env 파일을 편집하여 필요한 설정을 입력해주세요:
    echo    - DISCORD_CLIENT_ID
    echo    - DISCORD_CLIENT_SECRET
    echo    - DISCORD_BOT_TOKEN
    echo    - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
    echo    - SESSION_SECRET
) else (
    echo ✅ .env 파일이 이미 존재합니다.
)

:: TypeScript 컴파일
echo.
echo 🔧 TypeScript를 컴파일하는 중...
npx tsc

if %errorlevel% neq 0 (
    echo ❌ TypeScript 컴파일에 실패했습니다.
    pause
    exit /b 1
)

echo ✅ TypeScript 컴파일 완료

:: 완료 메시지
echo.
echo 🎉 Sodanen Bot Dashboard 설치가 완료되었습니다!
echo.
echo 다음 단계:
echo 1. .env 파일을 편집하여 필요한 설정을 입력하세요
echo 2. MariaDB가 실행 중이고 데이터베이스가 생성되어 있는지 확인하세요
echo 3. npm start 또는 npm run dev로 서버를 시작하세요
echo.
echo 문제가 있으면 README.md 파일을 참고하세요.
echo.

pause
