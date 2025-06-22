import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 번역 리소스
const resources = {
    ko: {
        translation: {
            // 공통
            "common.save": "저장",
            "common.cancel": "취소",
            "common.loading": "로딩 중...",
            "common.error": "오류",
            "common.success": "성공",
            "common.confirm": "확인",
            "common.back": "뒤로",
            "common.next": "다음",
            "common.previous": "이전",

            // 네비게이션
            "nav.dashboard": "대시보드",
            "nav.settings": "설정",
            "nav.commands": "명령어",
            "nav.announcements": "공지사항",
            "nav.home": "홈",

            // 설정 페이지
            "settings.title": "서버 설정",
            "settings.basic.title": "기본 설정",
            "settings.basic.description": "봇의 기본적인 동작을 설정합니다. (현재 설정 항목이 없습니다)",
            "settings.translation.title": "번역 설정",
            "settings.translation.description": "자동 번역 기능과 관련된 옵션을 설정합니다.",
            "settings.translation.enable": "번역 기능 활성화",
            "settings.translation.quickSetup": "빠른 설정",
            "settings.translation.manualSetup": "수동 설정",
            "settings.translation.sourceLanguage": "원본 언어",
            "settings.translation.targetLanguage": "대상 언어",
            "settings.permissions.title": "권한 설정",
            "settings.permissions.description": "명령어별로 사용자 권한을 관리합니다. (현재 준비 중)",
            "settings.saveChanges": "변경사항 저장",
            "settings.saving": "저장 중...",
            "settings.loadError": "설정을 불러오는 데 실패했습니다.",
            "settings.saveError": "설정 저장에 실패했습니다.",
            "settings.saveSuccess": "설정이 성공적으로 저장되었습니다.",
            "settings.validationError": "원본 언어와 대상 언어는 같을 수 없습니다.",

            // 언어 이름
            "language.ko": "한국어",
            "language.en": "English",
            "language.ja": "日本語",
            "language.zh-CN": "中文 (간체)",

            // 빠른 설정 버튼
            "quickSetup.koToJa": "한국어 → 일본어",
            "quickSetup.jaToKo": "일본어 → 한국어",
            "quickSetup.jaToEn": "일본어 → 영어",
            "quickSetup.enToJa": "영어 → 일본어",
            "quickSetup.koToEn": "한국어 → 영어",
            "quickSetup.enToKo": "영어 → 한국어",
            "quickSetup.koToZh": "한국어 → 중국어",
            "quickSetup.zhToKo": "중국어 → 한국어",

            // 대시보드
            "dashboard.title": "대시보드",
            "dashboard.overview": "개요",
            "dashboard.stats": "통계",
            "dashboard.guilds": "서버",
            "dashboard.users": "사용자",
            "dashboard.commands": "명령어",

            // 홈 페이지
            "home.title": "Sodanen Bot Dashboard",
            "home.welcome": "환영합니다",
            "home.description": "Discord 봇 관리 대시보드",
            "home.login": "로그인",
            "home.logout": "로그아웃",

            // 명령어 페이지
            "commands.title": "명령어",
            "commands.description": "사용 가능한 명령어 목록",

            // 공지사항 페이지
            "announcements.title": "공지사항",
            "announcements.description": "최신 업데이트 및 공지사항",
        },
    },
    en: {
        translation: {
            // Common
            "common.save": "Save",
            "common.cancel": "Cancel",
            "common.loading": "Loading...",
            "common.error": "Error",
            "common.success": "Success",
            "common.confirm": "Confirm",
            "common.back": "Back",
            "common.next": "Next",
            "common.previous": "Previous",

            // Navigation
            "nav.dashboard": "Dashboard",
            "nav.settings": "Settings",
            "nav.commands": "Commands",
            "nav.announcements": "Announcements",
            "nav.home": "Home",

            // Settings page
            "settings.title": "Server Settings",
            "settings.basic.title": "Basic Settings",
            "settings.basic.description": "Configure basic bot behavior. (No settings available)",
            "settings.translation.title": "Translation Settings",
            "settings.translation.description": "Configure automatic translation options.",
            "settings.translation.enable": "Enable Translation",
            "settings.translation.quickSetup": "Quick Setup",
            "settings.translation.manualSetup": "Manual Setup",
            "settings.translation.sourceLanguage": "Source Language",
            "settings.translation.targetLanguage": "Target Language",
            "settings.permissions.title": "Permission Settings",
            "settings.permissions.description": "Manage user permissions for each command. (Coming soon)",
            "settings.saveChanges": "Save Changes",
            "settings.saving": "Saving...",
            "settings.loadError": "Failed to load settings.",
            "settings.saveError": "Failed to save settings.",
            "settings.saveSuccess": "Settings saved successfully.",
            "settings.validationError": "Source and target languages cannot be the same.",

            // Language names
            "language.ko": "Korean",
            "language.en": "English",
            "language.ja": "Japanese",
            "language.zh-CN": "Chinese (Simplified)",

            // Quick setup buttons
            "quickSetup.koToJa": "Korean → Japanese",
            "quickSetup.jaToKo": "Japanese → Korean",
            "quickSetup.jaToEn": "Japanese → English",
            "quickSetup.enToJa": "English → Japanese",
            "quickSetup.koToEn": "Korean → English",
            "quickSetup.enToKo": "English → Korean",
            "quickSetup.koToZh": "Korean → Chinese",
            "quickSetup.zhToKo": "Chinese → Korean",

            // Dashboard
            "dashboard.title": "Dashboard",
            "dashboard.overview": "Overview",
            "dashboard.stats": "Statistics",
            "dashboard.guilds": "Guilds",
            "dashboard.users": "Users",
            "dashboard.commands": "Commands",

            // Home page
            "home.title": "Sodanen Bot Dashboard",
            "home.welcome": "Welcome",
            "home.description": "Discord Bot Management Dashboard",
            "home.login": "Login",
            "home.logout": "Logout",

            // Commands page
            "commands.title": "Commands",
            "commands.description": "List of available commands",

            // Announcements page
            "announcements.title": "Announcements",
            "announcements.description": "Latest updates and announcements",
        },
    },
    ja: {
        translation: {
            // 共通
            "common.save": "保存",
            "common.cancel": "キャンセル",
            "common.loading": "読み込み中...",
            "common.error": "エラー",
            "common.success": "成功",
            "common.confirm": "確認",
            "common.back": "戻る",
            "common.next": "次へ",
            "common.previous": "前へ",

            // ナビゲーション
            "nav.dashboard": "ダッシュボード",
            "nav.settings": "設定",
            "nav.commands": "コマンド",
            "nav.announcements": "お知らせ",
            "nav.home": "ホーム",

            // 設定ページ
            "settings.title": "サーバー設定",
            "settings.basic.title": "基本設定",
            "settings.basic.description": "ボットの基本的な動作を設定します。（現在設定項目がありません）",
            "settings.translation.title": "翻訳設定",
            "settings.translation.description": "自動翻訳機能に関するオプションを設定します。",
            "settings.translation.enable": "翻訳機能を有効にする",
            "settings.translation.quickSetup": "クイック設定",
            "settings.translation.manualSetup": "手動設定",
            "settings.translation.sourceLanguage": "元の言語",
            "settings.translation.targetLanguage": "対象言語",
            "settings.permissions.title": "権限設定",
            "settings.permissions.description": "コマンドごとにユーザー権限を管理します。（準備中）",
            "settings.saveChanges": "変更を保存",
            "settings.saving": "保存中...",
            "settings.loadError": "設定の読み込みに失敗しました。",
            "settings.saveError": "設定の保存に失敗しました。",
            "settings.saveSuccess": "設定が正常に保存されました。",
            "settings.validationError": "元の言語と対象言語は同じにできません。",

            // 言語名
            "language.ko": "韓国語",
            "language.en": "英語",
            "language.ja": "日本語",
            "language.zh-CN": "中国語（簡体字）",

            // クイック設定ボタン
            "quickSetup.koToJa": "韓国語 → 日本語",
            "quickSetup.jaToKo": "日本語 → 韓国語",
            "quickSetup.jaToEn": "日本語 → 英語",
            "quickSetup.enToJa": "英語 → 日本語",
            "quickSetup.koToEn": "韓国語 → 英語",
            "quickSetup.enToKo": "英語 → 韓国語",
            "quickSetup.koToZh": "韓国語 → 中国語",
            "quickSetup.zhToKo": "中国語 → 韓国語",

            // ダッシュボード
            "dashboard.title": "ダッシュボード",
            "dashboard.overview": "概要",
            "dashboard.stats": "統計",
            "dashboard.guilds": "サーバー",
            "dashboard.users": "ユーザー",
            "dashboard.commands": "コマンド",

            // ホームページ
            "home.title": "Sodanen Bot Dashboard",
            "home.welcome": "ようこそ",
            "home.description": "Discordボット管理ダッシュボード",
            "home.login": "ログイン",
            "home.logout": "ログアウト",

            // コマンドページ
            "commands.title": "コマンド",
            "commands.description": "利用可能なコマンドのリスト",

            // お知らせページ
            "announcements.title": "お知らせ",
            "announcements.description": "最新のアップデートとお知らせ",
        },
    },
    "zh-CN": {
        translation: {
            // 通用
            "common.save": "保存",
            "common.cancel": "取消",
            "common.loading": "加载中...",
            "common.error": "错误",
            "common.success": "成功",
            "common.confirm": "确认",
            "common.back": "返回",
            "common.next": "下一步",
            "common.previous": "上一步",

            // 导航
            "nav.dashboard": "仪表板",
            "nav.settings": "设置",
            "nav.commands": "命令",
            "nav.announcements": "公告",
            "nav.home": "首页",

            // 设置页面
            "settings.title": "服务器设置",
            "settings.basic.title": "基本设置",
            "settings.basic.description": "配置基本机器人行为。（当前无设置项）",
            "settings.translation.title": "翻译设置",
            "settings.translation.description": "配置自动翻译选项。",
            "settings.translation.enable": "启用翻译",
            "settings.translation.quickSetup": "快速设置",
            "settings.translation.manualSetup": "手动设置",
            "settings.translation.sourceLanguage": "源语言",
            "settings.translation.targetLanguage": "目标语言",
            "settings.permissions.title": "权限设置",
            "settings.permissions.description": "管理每个命令的用户权限。（即将推出）",
            "settings.saveChanges": "保存更改",
            "settings.saving": "保存中...",
            "settings.loadError": "加载设置失败。",
            "settings.saveError": "保存设置失败。",
            "settings.saveSuccess": "设置保存成功。",
            "settings.validationError": "源语言和目标语言不能相同。",

            // 语言名称
            "language.ko": "韩语",
            "language.en": "英语",
            "language.ja": "日语",
            "language.zh-CN": "中文（简体）",

            // 快速设置按钮
            "quickSetup.koToJa": "韩语 → 日语",
            "quickSetup.jaToKo": "日语 → 韩语",
            "quickSetup.jaToEn": "日语 → 英语",
            "quickSetup.enToJa": "英语 → 日语",
            "quickSetup.koToEn": "韩语 → 英语",
            "quickSetup.enToKo": "英语 → 韩语",
            "quickSetup.koToZh": "韩语 → 中文",
            "quickSetup.zhToKo": "中文 → 韩语",

            // 仪表板
            "dashboard.title": "仪表板",
            "dashboard.overview": "概览",
            "dashboard.stats": "统计",
            "dashboard.guilds": "服务器",
            "dashboard.users": "用户",
            "dashboard.commands": "命令",

            // 首页
            "home.title": "Sodanen Bot Dashboard",
            "home.welcome": "欢迎",
            "home.description": "Discord机器人管理仪表板",
            "home.login": "登录",
            "home.logout": "登出",

            // 命令页面
            "commands.title": "命令",
            "commands.description": "可用命令列表",

            // 公告页面
            "announcements.title": "公告",
            "announcements.description": "最新更新和公告",
        },
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "ko",
        debug: false,

        detection: {
            order: ["navigator", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"],
        },

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    });

export default i18n;
