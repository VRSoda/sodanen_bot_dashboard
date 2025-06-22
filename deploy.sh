#!/bin/bash

# 무중단 배포 스크립트
set -e

PROJECT_PATH="/var/www/sodanen_bot_dashboard"
BACKUP_PATH="/var/backups/sodanen_bot_dashboard"
DATE=$(date +%Y%m%d_%H%M%S)

echo "🚀 Starting zero-downtime deployment..."

# 1. 백업 생성
echo "📦 Creating backup..."
mkdir -p $BACKUP_PATH
tar -czf $BACKUP_PATH/backup_$DATE.tar.gz -C $PROJECT_PATH .

# 2. 새로운 코드 가져오기
echo "📥 Pulling latest code..."
cd $PROJECT_PATH
git fetch origin
git checkout main
git pull origin main

# 3. 의존성 설치
echo "📦 Installing dependencies..."
npm ci --production

# 4. 빌드
echo "🏗️ Building application..."
npm run build

# 5. 데이터베이스 마이그레이션 (필요한 경우)
echo "🗃️ Running database migrations..."
# npm run migrate

# 6. 새로운 Docker 이미지 빌드
echo "🐳 Building new Docker image..."
docker-compose -f docker-compose.prod.yml build app

# 7. 무중단 배포 실행
echo "🔄 Performing zero-downtime deployment..."

# 새로운 컨테이너 시작
docker-compose -f docker-compose.prod.yml up -d --no-deps app_new

# 헬스체크 대기
echo "🏥 Waiting for health check..."
for i in {1..30}; do
    if curl -f http://localhost:3002/api/health > /dev/null 2>&1; then
        echo "✅ New container is healthy!"
        break
    fi
    echo "⏳ Waiting for container to be ready... ($i/30)"
    sleep 2
done

# 트래픽 전환
echo "🔀 Switching traffic..."
docker-compose -f docker-compose.prod.yml stop app
docker-compose -f docker-compose.prod.yml rm -f app
docker rename sodanen_bot_app_new sodanen_bot_app

# Nginx 설정 리로드
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

# 이전 컨테이너 정리
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ Deployment completed successfully!"

# 배포 알림 (선택사항)
# curl -X POST -H 'Content-type: application/json' \
#     --data '{"text":"🚀 Sodanen Bot Dashboard deployed successfully!"}' \
#     $SLACK_WEBHOOK_URL
