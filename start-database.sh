#!/bin/bash

echo "========================================"
echo "   Sodanen Bot MariaDB Docker Setup"
echo "========================================"
echo

echo "[1/4] Docker 상태 확인 중..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker가 설치되지 않았습니다."
    echo "   Docker를 설치하고 실행해주세요."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker가 실행되지 않고 있습니다."
    echo "   Docker를 시작해주세요."
    exit 1
fi

echo "✅ Docker가 실행 중입니다."
echo

echo "[2/4] 기존 컨테이너 정리 중..."
docker-compose down 2>/dev/null

echo "[3/4] MariaDB 컨테이너 시작 중..."
docker-compose up -d mariadb

echo "[4/4] 데이터베이스 연결 대기 중..."
sleep 10

echo
echo "========================================"
echo "          설정 완료!"
echo "========================================"
echo
echo "📊 MariaDB:        localhost:3306"
echo "🌐 phpMyAdmin:     http://localhost:8080"
echo
echo "데이터베이스 정보:"
echo "  - Database: sodanen_bot"
echo "  - User: root"
echo "  - Password: 1234"
echo
echo "컨테이너 상태 확인:"
docker-compose ps
echo
echo "로그 확인: docker-compose logs mariadb"
echo "중지: docker-compose down"
echo
