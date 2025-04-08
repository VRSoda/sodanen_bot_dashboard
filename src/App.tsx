// App.tsx
import "./App.css";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import React, { useState, useCallback, lazy, Suspense } from "react";

// Lazy Loading 적용
const Home = lazy(() => import("./page/Home"));
const Commands = lazy(() => import("./page/Commands"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const UptimeKumaStatus = lazy(() => import("./page/UptimeKumaStatus")); // UptimeKumaStatus Lazy Loading

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // useCallback으로 toggleMenu 함수 메모이제이션
    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const styles = {
        primary: "bg-indigo-600 text-white",
        secondary: "bg-gray-100 text-gray-700",
        accent: "text-indigo-400",
        border: "border-gray-300",
    };

    const menuItems = [
        { path: "/", label: "홈" },
        { path: "/commands", label: "명령어" },
        { path: "/community", label: "커뮤니티" },
        { path: "/invite", label: "초대하기" },
        { path: "/dashboard", label: "대시보드" },
        { path: "/announcements", label: "공지사항" },
        { path: "/status", label: "서비스 상태" },
    ];

    return (
        <BrowserRouter>
            <div className="App flex flex-col min-h-screen bg-gray-50 text-gray-800">
                {/* Navbar */}
                <nav
                    className={`flex justify-between items-center ${styles.primary} py-4 px-6 shadow-md`}
                >
                    <div className="text-2xl font-bold">
                        <Link to="/">Sodanen_Bot</Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="hidden md:flex space-x-6">
                        {menuItems.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `hover:${styles.accent} ${
                                            isActive ? styles.accent : ""
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="relative">
                        <button className="rounded-full focus:outline-none">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://pbs.twimg.com/profile_images/1734752113190985728/lLY9P2HT_400x400.jpg"
                                alt="Profile"
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 left-0 w-full h-full ${
                        styles.secondary
                    } z-50 transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <button
                        className="absolute top-4 right-4 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                    <ul className="flex flex-col items-center justify-center h-full space-y-8">
                        {menuItems.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    onClick={toggleMenu}
                                    className={`text-xl ${styles.secondary} hover:${styles.accent}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Suspense fallback={null}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/commands" element={<Commands />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/status"
                                element={<UptimeKumaStatus />}
                            />{" "}
                            {/* UptimeKumaStatus Route 추가 */}
                        </Routes>
                    </Suspense>
                </main>
                <footer className="w-full bg-gray-900 text-gray-300 py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <section className="flex flex-col items-start mb-6 md:mb-0">
                                <figure className="text-3xl font-bold mb-3">
                                    <span className="text-blue-400">
                                        Sodanen
                                    </span>
                                    Bot
                                </figure>
                                <p className="text-sm text-gray-500">
                                    © 2025 All rights reserved.
                                </p>
                            </section>
                            <div className="flex flex-col md:flex-row">
                                <section className="flex flex-col items-start mb-6 md:mb-0 md:mr-12">
                                    <h2 className="text-lg font-semibold mb-3 text-white">
                                        약관
                                    </h2>
                                    <ul className="text-sm space-y-2">
                                        <li>
                                            <a
                                                href="/terms-of-service"
                                                className="hover:text-blue-400 transition-colors duration-200"
                                            >
                                                서비스 이용약관
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/privacy-policy"
                                                className="hover:text-blue-400 transition-colors duration-200"
                                            >
                                                개인정보 처리 방침
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/copyright"
                                                className="hover:text-blue-400 transition-colors duration-200"
                                            >
                                                저작권
                                            </a>
                                        </li>
                                    </ul>
                                </section>
                                <section className="flex flex-col items-start">
                                    <h2 className="text-lg font-semibold mb-3 text-white">
                                        지원
                                    </h2>
                                    <ul className="text-sm space-y-2">
                                        <li>
                                            공식 디스코드:
                                            <a
                                                href="https://discord.gg/SdDqbgdm"
                                                className="text-blue-400 underline hover:text-blue-500 transition-colors duration-200 ml-1"
                                            >
                                                https://discord.gg/SdDqbgdm
                                            </a>
                                        </li>
                                        <li>
                                            이메일 문의:
                                            <a
                                                href="mailto:jun.codework@gmail.com"
                                                className="text-blue-400 underline hover:text-blue-500 transition-colors duration-200 ml-1"
                                            >
                                                jun.codework@gmail.com
                                            </a>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
