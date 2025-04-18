import React, { useState, useEffect } from "react";

interface DiscordServer {
    id: string;
    name: string;
    icon: string | null;
    backgroundImage: string | null;
}

const LoggedInDashboard: React.FC = () => {
    const [servers, setServers] = useState<DiscordServer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredServers, setFilteredServers] = useState<DiscordServer[]>([]);

    useEffect(() => {
        // API 호출
        const fetchServers = async () => {
            // 예시 데이터 (임시 이미지 URL 사용)
            const mockServers: DiscordServer[] = [
                { id: "1", name: "서버 1 (긴 이름 테스트)", icon: "https://via.placeholder.com/80/FF0000", backgroundImage: "https://via.placeholder.com/300x80/00FF00" },
                { id: "2", name: "서버 2", icon: "https://via.placeholder.com/80/00FF00", backgroundImage: "https://via.placeholder.com/300x80/0000FF" },
                { id: "3", name: "서버 3", icon: "https://via.placeholder.com/80/0000FF", backgroundImage: "https://via.placeholder.com/300x80/FFFF00" },
                { id: "4", name: "서버 4", icon: "https://via.placeholder.com/80/FFFF00", backgroundImage: "https://via.placeholder.com/300x80/FF00FF" },
                { id: "5", name: "서버 5", icon: "https://via.placeholder.com/80/FF00FF", backgroundImage: "https://via.placeholder.com/300x80/00FFFF" },
                { id: "6", name: "서버 6", icon: "https://via.placeholder.com/80/00FFFF", backgroundImage: "https://via.placeholder.com/300x80/800000" },
                { id: "7", name: "서버 7", icon: "https://via.placeholder.com/80/800000", backgroundImage: "https://via.placeholder.com/300x80/008000" },
                { id: "8", name: "서버 8", icon: "https://via.placeholder.com/80/008000", backgroundImage: "https://via.placeholder.com/300x80/000080" },
                { id: "9", name: "서버 9", icon: "https://via.placeholder.com/80/000080", backgroundImage: "https://via.placeholder.com/300x80/808000" },
                { id: "10", name: "서버 10", icon: "https://via.placeholder.com/80/808000", backgroundImage: "https://via.placeholder.com/300x80/800080" },
            ];
            setServers(mockServers);
        };

        fetchServers();
    }, []);

    useEffect(() => {
        const results = servers.filter((server) => server.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredServers(results);
    }, [searchTerm, servers]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleJoinServer = (serverId: string) => {
        alert(`서버 ${serverId}에 입장합니다! (실제로는 구현 필요)`);
    };

    return (
        <div className="flex flex-col bg-gray-50 w-screen h-full items-center justify-start">
            <div className="mt-16 w-full max-w-7xl px-6 flex flex-col items-center">
                <div className="mb-8 flex justify-center w-full">
                    <input
                        type="text"
                        placeholder="서버 검색"
                        className="w-full sm:w-1/2 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-md"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto w-full">
                    {filteredServers.map((server) => (
                        <div key={server.id} className={`relative rounded-2xl shadow-md overflow-hidden h-32`}>
                            <img
                                src={server.backgroundImage ?? "https://via.placeholder.com/300x80"}
                                alt={`${server.name} 배경 이미지`}
                                className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />

                            <div className="absolute inset-0 p-4 flex items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                                    <img src={server.icon ?? "https://via.placeholder.com/80"} alt={`${server.name} 아이콘`} className="w-full h-full object-cover" />
                                </div>

                                <p className="text-white font-semibold text-lg ml-4 flex-grow text-left">{server.name}</p>

                                <button
                                    onClick={() => handleJoinServer(server.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                >
                                    입장하기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoggedInDashboard;
