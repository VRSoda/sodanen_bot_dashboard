// Home.jsx
const Home = () => {
    return (
        <div className="flex flex-col bg-gradient-to-br from-sky-100 to-sky-50 min-h-screen font-sans">
            <main className="flex-grow flex flex-col items-center py-12 px-6 rounded-3xl shadow-xl mt-5 mb-5 transition-all duration-500 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative">
                <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl z-0"></div>
                <div className="relative z-10 flex flex-col items-center w-full">
                    <header
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                    >
                        <p className="text-xl font-semibold text-center tracking-wide">
                            ✨ 새로운 기능 "추가된 기능 내용" 을 확인해보세요! ✨
                        </p>
                    </header>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-12 w-full">
                        <figure className="border-2 border-gray-200 rounded-full p-4 flex justify-center items-center w-48 h-48 md:w-56 md:h-56 shadow-md">
                            <div className="text-gray-400">이미지 넣어야 할 곳</div>
                        </figure>
                        <article className="text-gray-700 mt-8 md:mt-0 md:ml-12">
                            <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
                                🚀 내용 내용 내용 내용 내용 내용
                            </h2>
                            <p className="text-lg leading-relaxed">내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용</p>
                            <button className="btn btn-primary mt-8">시작하기</button>
                        </article>
                    </div>
                </div>
            </main>

            <footer className="w-full bg-gray-900 text-gray-300 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <section className="flex flex-col items-start mb-6 md:mb-0">
                            <figure className="text-3xl font-bold mb-3">
                                <span className="text-blue-400">Sodanen</span>Bot
                            </figure>
                            <p className="text-sm text-gray-500">© 2025 All rights reserved.</p>
                        </section>
                        <div className="flex flex-col md:flex-row">
                            <section className="flex flex-col items-start mb-6 md:mb-0 md:mr-12">
                                <h2 className="text-lg font-semibold mb-3 text-white">약관</h2>
                                <ul className="text-sm space-y-2">
                                    <li>
                                        <a href="/terms-of-service" className="hover:text-blue-400 transition-colors duration-200">서비스 이용약관</a>
                                    </li>
                                    <li>
                                        <a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-200">개인정보 처리 방침</a>
                                    </li>
                                    <li>
                                        <a href="/copyright" className="hover:text-blue-400 transition-colors duration-200">저작권</a>
                                    </li>
                                </ul>
                            </section>
                            <section className="flex flex-col items-start">
                                <h2 className="text-lg font-semibold mb-3 text-white">지원</h2>
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
    );
};

export default Home;
