// Home.jsx
const Home = () => {
    return (
        <main className="flex-grow flex flex-col items-center py-12 px-6 rounded-3xl mt-5 mb-5 transition-all duration-500 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative">
            <div className="relative z-10 flex flex-col items-center w-full">
                <header className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                    <p className="text-xl font-semibold text-center tracking-wide">
                        ✨ 새로운 기능 "추가된 기능 내용" 을 확인해보세요! ✨
                    </p>
                </header>
                <div className="flex flex-col md:flex-row justify-center items-center mt-12 w-full">
                    <figure className="border-2 border-gray-200 rounded-full p-4 flex justify-center items-center w-48 h-48 md:w-56 md:h-56 shadow-md">
                        <div className="text-gray-400">이미지 넣어야 할 곳</div>
                    </figure>
                    <article className="text-gray-70a0 mt-8 md:mt-0 md:ml-12">
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
                            🚀 내용 내용 내용 내용 내용 내용
                        </h2>
                        <p className="text-lg leading-relaxed">
                            내용 내용 내용 내용 내용 내용 내용 내용 내용 내용
                            내용 내용
                        </p>
                        <button className="btn btn-primary mt-8">
                            시작하기
                        </button>
                    </article>
                </div>
            </div>
        </main>
    );
};

export default Home;
