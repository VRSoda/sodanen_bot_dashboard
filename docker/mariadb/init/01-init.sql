-- Sodanen Bot Database 초기화 스크립트
-- 이 파일은 컨테이너 첫 실행 시 자동으로 실행됩니다

-- 한국어 설정을 위한 문자 집합 설정
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;

-- 데이터베이스 생성 (이미 docker-compose에서 생성되지만 확인차 추가)
CREATE DATABASE IF NOT EXISTS sodanen_bot 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 초기 설정 완료 로그
SELECT 'Sodanen Bot Database initialized successfully!' AS message;
