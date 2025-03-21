const Home = () => {
    return (
        <div className="flex-auto border-2 border-orange-400 flex flex-col items-center h-auto">
            <div className="flex justify-center items-center m-8 h-6 text-center rounded-xl w-5/6">
                💙 새로운 기능을 확인해보세요.
            </div>
            
            <div className="border-2 border-blue-400 flex justify-center space-x-4 h-2/2 w-screen">
                <div className="border-2">image</div>
                <div className="border-2">글로벌한 봇을 원하시나요?</div>
            </div>
        </div>
    );
};

export default Home;