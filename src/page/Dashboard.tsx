import React, { useRef, useEffect, useState } from 'react';
import LoggedInDashboard from './LoggedInDashboard'; // LoggedInDashboard 경로 업데이트

const Dashboard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target?.classList.add("animate-fade-in", "animate-slide-up");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const handleLogin = () => {
        // 실제 로그인 로직 (API 호출 등)을 여기에 구현해야 합니다.
        // 예시: API 호출 성공 후 setIsLoggedIn(true) 호출
        setIsLoggedIn(true); // 예시로 바로 로그인 상태 변경
    };

    return (
        <div className="bg-gradient-to-br to-blue-50 h-screen">
            {isLoggedIn ? (
                <LoggedInDashboard />
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div
                        ref={containerRef}
                        className="bg-white shadow-xl rounded-3xl p-12 text-center transform -translate-y-10 opacity-0 transition-all duration-700 w-full max-w-md"
                    >
                        <div className="mb-8">
                            <img
                                src="https://via.placeholder.com/150/4682B4/FFFFFF?text=Discord+Bot" // 디스코드 봇 이미지
                                alt="Discord Bot"
                                className="mx-auto rounded-full mb-4 shadow-md"
                            />
                            <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
                                디스코드로 시작하기
                            </h1>
                            <p className="text-gray-700 mb-6">
                                디스코드 계정으로 로그인하여 봇을 사용해 보세요.
                            </p>
                        </div>
                        <button
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={handleLogin} // 로그인 버튼 클릭 시 handleLogin 함수 호출
                        >
                            <i className="fab fa-discord mr-2"></i> 디스코드 로그인
                        </button>
                        <div className="mt-6 text-sm text-gray-500">
                            디스코드 계정이 필요합니다.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
