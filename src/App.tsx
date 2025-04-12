import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { useState, useCallback, lazy, Suspense } from "react";
import { FaDiscord, FaEnvelope, FaList, FaTachometerAlt, FaBell, FaQuestionCircle } from "react-icons/fa";

const Home = lazy(() => import("./page/Home"));
const Commands = lazy(() => import("./page/Commands"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const UptimeKumaStatus = lazy(() => import("./page/UptimeKumaStatus"));
const Announcements = lazy(() => import("./page/Announcements"));
const TermsOfService = lazy(() => import("./page/TermsOfService"));

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const mainMenuItems = [
        { path: "/commands", label: "명령어", icon: FaList },
        { path: "https://example.com/community", label: "커뮤니티", icon: FaDiscord, isExternal: true },
        { path: "/dashboard", label: "대시보드", icon: FaTachometerAlt },
    ];

    const extraMenuItems = [
        { path: "/announcements", label: "공지사항", icon: FaBell },
        { path: "/status", label: "서비스 상태", icon: FaQuestionCircle },
    ];

    const renderMenuItems = (items: any[], isMobile = false) => {
        return items.map(({ path, label, icon: Icon, isExternal }) =>
            isExternal ? (
                <a
                    key={path}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 border-b-2 hover:border-indigo-600 border-transparent flex items-center"
                    onClick={isMobile ? toggleMenu : undefined}
                >
                    {Icon && <Icon className="mr-1.5" />}
                    {label}
                </a>
            ) : (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `text-gray-600 hover:text-indigo-600 border-b-2 hover:border-indigo-600 flex items-center ${
                            isActive ? "text-indigo-600 font-semibold border-indigo-600" : "border-transparent hover:border-indigo-600"
                        }`
                    }
                    onClick={isMobile ? toggleMenu : undefined}
                >
                    {Icon && <Icon className="mr-1.5" />}
                    {label}
                </NavLink>
            )
        );
    };

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans over">
                <nav className="bg-white shadow-md py-4 px-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <NavLink to="/" className="text-2xl font-bold text-blue-500">
                            Sodanen_Bot
                        </NavLink>
                        <div className="hidden md:flex items-center space-x-6">{renderMenuItems(mainMenuItems)}</div>
                        <div className="hidden md:flex items-center space-x-4">
                            {renderMenuItems(extraMenuItems)}
                            <button className="rounded-full focus:outline-none ml-4">
                                <img className="h-10 w-10 rounded-full object-cover" src="../src/image/Profile_Sodanen.jpg" alt="Profile" />
                            </button>
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="focus:outline-none">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                <div
                    className={`fixed top-0 left-0 w-full h-full bg-gray-100 text-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <button className="absolute top-4 right-4 focus:outline-none" onClick={toggleMenu}>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <ul className="flex flex-col items-center justify-center h-full space-y-8">
                        {renderMenuItems(mainMenuItems, true)}
                        {renderMenuItems(extraMenuItems, true)}
                    </ul>
                </div>

                <main className="flex-1 overflow-auto p-6">
                    <Suspense fallback={<div className="flex justify-center items-center h-full"></div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/commands" element={<Commands />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/status" element={<UptimeKumaStatus />} />
                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                        </Routes>
                    </Suspense>
                </main>

                <footer className="bg-gray-50 text-gray-700 shadow-2xl">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
                            <section className="border-r border-gray-300 last:border-r-0">
                                <div className="text-3xl font-bold mb-4">
                                    <span className="text-blue-500">Sodanen</span>Bot
                                </div>
                                <p className="text-sm text-gray-500 mb-4">© 2025 All rights reserved.</p>
                            </section>
                            <section className="border-r border-gray-300 last:border-r-0">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">약관</h2>
                                <ul className="text-sm space-y-2">
                                    <li>
                                        <NavLink to="/terms-of-service" className="hover:text-blue-500 transition-colors duration-200">
                                            서비스 이용약관
                                        </NavLink>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                                    <FaEnvelope className="mr-2" />
                                    지원
                                </h2>
                                <ul className="text-sm space-y-2">
                                    <li>
                                        공식 디스코드:
                                        <a
                                            href="https://discord.gg/SdDqbgdm"
                                            className="text-blue-500 underline hover:text-blue-600 transition-colors duration-200 ml-1 flex items-center"
                                        >
                                            <FaDiscord className="mr-1" />
                                            https://discord.gg/SdDqbgdm
                                        </a>
                                    </li>
                                    <li>
                                        이메일 문의:
                                        <a
                                            href="mailto:jun.codework@gmail.com"
                                            className="text-blue-500 underline hover:text-blue-600 transition-colors duration-200 ml-1 flex items-center"
                                        >
                                            <FaEnvelope className="mr-1" />
                                            jun.codework@gmail.com
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
