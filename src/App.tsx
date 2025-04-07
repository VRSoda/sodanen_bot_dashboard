// App.jsx
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./page/Home";
import Commands from "./page/Commands";
import { useState } from "react";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <BrowserRouter>
            <div className="App flex flex-col min-h-screen">
                <div className="navbar bg-base-100 justify-between">
                    {/* 홈페이지 제목 */}
                    <div className="flex-1">
                        <Link to={"/"}>
                            <input
                                type="button"
                                className="btn btn-ghost text-xl"
                                value="Sodanen_Bot"
                            />
                        </Link>
                    </div>

                    {/* 모바일 햄버거 메뉴 */}
                    <div className="md:hidden">
                        <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-5 h-5 stroke-current"
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

                    {/* 네비게이션 바 (데스크톱) */}
                    <ul className="menu menu-horizontal px-1 mx-auto hidden md:flex">
                        <li className="mr-4">
                            <Link to="/commands">명령어</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/community">커뮤니티</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/invite">초대하기</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/dashboard">대시보드</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/announcements">공지사항</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/status">서비스 상태</Link>
                        </li>
                    </ul>

                    {/* 전체 화면 메뉴 (모바일) */}
                    <div
                        className={`fixed top-0 left-0 w-full h-full bg-base-100 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        {/* 닫기 버튼 */}
                        <button
                            className="absolute top-4 right-4 btn btn-square btn-ghost"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>

                        {/* 메뉴 내용 */}
                        <ul className="menu menu-col h-full flex flex-col justify-center items-center">
                            <li>
                                <Link to="/commands" onClick={toggleMenu}>명령어</Link>
                            </li>
                            <li>
                                <Link to="/community" onClick={toggleMenu}>커뮤니티</Link>
                            </li>
                            <li>
                                <Link to="/invite" onClick={toggleMenu}>초대하기</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" onClick={toggleMenu}>대시보드</Link>
                            </li>
                            <li>
                                <Link to="/announcements" onClick={toggleMenu}>공지사항</Link>
                            </li>
                            <li>
                                <Link to="/status" onClick={toggleMenu}>서비스 상태</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 프로필 사진 */}
                    <div className="flex-none mr-6">
                        <div className="dropdown dropdown-end">
                            <button
                                className="btn btn-ghost btn-circle avatar"
                                onClick={() => {}}
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Navbar component"
                                        src="https://pbs.twimg.com/profile_images/1734752113190985728/lLY9P2HT_400x400.jpg"
                                    />
                                </div>
                            </button>
                            {/* 프로필 사진 드롭다운 메뉴 */}
                            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="flex justify-between items-center">
                                        Profile
                                        <div className="badge ml-2">New</div>
                                    </button>
                                </li>
                                <li>
                                    <button>Settings</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/commands" element={<Commands />} /> {/* Route 추가 */}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
