import React from "react";
import ProfileImage from "../image/Bot_Logo.png";

const Home: React.FC = () => {
    return (
        <main className="flex-grow flex flex-col items-center py-12 px-6 rounded-3xl mt-5 mb-5 transition-all duration-500 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative animated-background">
            <div className="relative z-10 flex flex-col items-center w-full">
                <header className="w-full max-w-md bg-white text-blue-600 py-4 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                    <p className="text-lg font-semibold text-center tracking-wide">✨ 새로운 기능 & 업데이트를 확인하세요! ✨</p>
                </header>
                <div className="flex flex-col md:flex-row justify-center items-center mt-12 w-full">
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        className="rounded-full shadow-md w-48 h-48 md:w-56 md:h-56 object-cover object-center transition-all duration-300 hover:scale-105"
                    />
                    <article className="text-gray-700 mt-8 md:mt-0 md:ml-12 text-center md:text-left">
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">🛠 홈페이지 제작 중</h2>
                        <p className="text-lg leading-relaxed mb-6">더 멋진 모습으로 찾아뵙겠습니다!</p>
                        <a href="https://discord.gg/SdDqbgdm" target="_blank" rel="noopener noreferrer">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                디스코드 초대
                            </button>
                        </a>
                    </article>
                </div>
            </div>
        </main>
    );
};

export default Home;
