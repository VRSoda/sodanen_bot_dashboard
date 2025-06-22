# Sodanen Bot Dashboard - Material-UI Migration

## 프로젝트 개요
기존 Tailwind CSS 기반의 Sodanen Bot Dashboard를 Material-UI (MUI)로 성공적으로 전환했습니다.

## 주요 변경사항

### 1. 의존성 변경
- **제거된 패키지:**
  - `tailwindcss`
  - `autoprefixer`
  - `postcss`
  - `react-icons`

- **추가된 패키지:**
  - `@mui/material`
  - `@mui/icons-material`
  - `@mui/x-data-grid`
  - `@emotion/react`
  - `@emotion/styled`

### 2. 설정 파일 변경
- `tailwind.config.js` 제거
- `postcss.config.js` 제거
- `src/index.css` Material-UI 전용으로 변경
- `src/App.css` Material-UI 커스텀 스타일로 변경

### 3. 컴포넌트 전환
모든 페이지와 컴포넌트를 Material-UI로 재작성:

#### App.tsx
- Tailwind 클래스를 Material-UI 컴포넌트로 전환
- `AppBar`, `Toolbar`, `Drawer` 등 사용
- 반응형 디자인 유지
- 테마 시스템 적용

#### 페이지별 변경사항:

**Home.tsx**
- `Card`, `CardContent`, `Avatar`, `Button` 등 사용
- 애니메이션을 `Fade`, `Grow` 컴포넌트로 구현
- 그라데이션 배경과 Material Design 스타일 적용

**Commands.tsx**
- `Grid`, `List`, `ListItem`, `Collapse` 등으로 구조화
- 명령어 카테고리별 확장/축소 기능
- `Chip`, `Divider` 등으로 시각적 개선

**Dashboard.tsx**
- 로그인 화면과 대시보드를 Material-UI로 재구성
- `CircularProgress`, `Alert` 등으로 상태 표시
- 그라데이션 배경과 카드 레이아웃

**LoggedInDashboard.tsx**
- 서버 카드를 Material-UI 스타일로 재설계
- `TextField`, `Tabs`, `Badge` 등으로 필터링 UI 구현
- 서버 상태와 정보를 카드 형태로 표시

**Announcements.tsx**
- 공지사항을 카드 형태로 표시
- 날짜 표시를 `Chip` 컴포넌트로 개선
- 로딩 상태와 에러 처리 UI 개선

**UptimeKumaStatus.tsx**
- 서비스 상태를 시각적으로 표시
- `LinearProgress`, 상태 인디케이터 등 추가
- 실시간 모니터링 UI 구현

**TermsOfService.tsx**
- 약관을 구조화된 형태로 표시
- `Table`, `List`, `Divider` 등으로 가독성 향상

### 4. 스타일링 개선사항
- **일관된 디자인 시스템:** Material Design 가이드라인 준수
- **반응형 디자인:** 모바일, 태블릿, 데스크톱 최적화
- **애니메이션:** `Fade`, `Grow` 등을 활용한 부드러운 전환
- **테마 시스템:** 통일된 색상 팔레트와 타이포그래피
- **접근성:** Material-UI의 내장 접근성 기능 활용

### 5. 기능적 개선사항
- **반응형 네비게이션:** 데스크톱/모바일 모두 지원
- **로딩 상태:** 일관된 로딩 인디케이터
- **에러 처리:** 통일된 에러 표시 방식
- **사용자 피드백:** 호버 효과, 클릭 피드백 등

## 실행 방법

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## 주요 특징
- **모던한 UI/UX:** Material Design 3.0 기반
- **성능 최적화:** 코드 스플리팅과 지연 로딩
- **TypeScript 완전 지원:** 타입 안전성 보장
- **반응형 디자인:** 모든 디바이스에서 최적화된 경험
- **접근성:** WCAG 가이드라인 준수

## 기술 스택
- **Frontend:** React 18 + TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion (CSS-in-JS)
- **Icons:** Material Icons
- **Build Tool:** Vite
- **Backend:** Supabase
- **Authentication:** Discord OAuth

전환이 성공적으로 완료되었으며, 모든 기존 기능이 유지되면서 더욱 세련되고 일관된 사용자 경험을 제공합니다.
