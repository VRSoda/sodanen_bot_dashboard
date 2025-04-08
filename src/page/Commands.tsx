import React, { useState, useRef, useEffect } from "react";

interface Command {
    name: string;
    description: string;
    example: string;
    category: string;
}

const Commands: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
        "일반": false,
        "관리": false,
        "음악": false,
        "번역": false,
    });

    const commands: Command[] = [
        {
            name: "/1",
            description: "ㄹㅇㄹㄴㅇㄹㄹ",
            example: "/1",
            category: "일반",
        },
        {
            name: "/1",
            description: "ㅇㄴㄹㅇㄴㄹㅇ.",
            example: "/1",
            category: "관리",
        },
        {
            name: "/1",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "음악",
        },
        {
            name: "/1",
            description: "ㄴㅇㄹㅇㄴㄹ",
            example: "/1",
            category: "번역",
        },
    ];

    const categories = ["일반", "관리", "음악", "번역"];

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        setSelectedCommand(null);
    };

    const handleCommandClick = (command: Command) => {
        setSelectedCommand(command);
        setSelectedCategory(null);
    };

    const handleCategoryHover = (category: string, isHovered: boolean) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: isHovered,
        }));
    };

    const commandInfoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-slide-up", "opacity-100", "translate-y-0");
                        observer.unobserve(entry.target); // 한 번 보이면 관찰 중단
                    } else {
                        entry.target.classList.remove("animate-slide-up", "opacity-100", "translate-y-0");
                    }
                });
            },
            {
                threshold: 0.1, // 10%만 보여도 실행
            }
        );

        if (commandInfoRef.current) {
            commandInfoRef.current.classList.remove("animate-slide-up", "opacity-100", "translate-y-0"); // 초기 상태 설정
            observer.observe(commandInfoRef.current);
        }

        return () => {
            if (commandInfoRef.current) {
                observer.unobserve(commandInfoRef.current);
            }
        };
    }, [selectedCategory, selectedCommand]);  // selectedCategory 추가

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 bg-white shadow-lg rounded-2xl p-4">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">명령어 목록</h2>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category}
                                onMouseEnter={() => handleCategoryHover(category, true)}
                                onMouseLeave={() => handleCategoryHover(category, false)}
                            >
                                <button
                                    className={`flex items-center w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 ${selectedCategory === category ? "bg-blue-500 text-white font-semibold" : "text-gray-700"
                                        }`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </button>
                                <ul className={`space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategories[category] ? "max-h-96" : "max-h-0"}`}>
                                    {commands
                                        .filter((command) => command.category === category)
                                        .map((command) => (
                                            <li key={command.name} className="transition-opacity duration-300 ease-in-out">
                                                <button
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 pl-8 text-gray-600"
                                                    onClick={() => handleCommandClick(command)}
                                                >
                                                    {command.name}
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-3/4 bg-white shadow-lg rounded-2xl p-6">
                    <div
                        ref={commandInfoRef}
                        className="transition-opacity duration-500 transform translate-y-5 opacity-0"
                    >
                        {selectedCommand ? (
                            <div className="rounded-xl p-6">
                                <h1 className="text-3xl font-bold mb-4 text-blue-700">{selectedCommand.name}</h1>
                                <div className="mb-6 pb-4 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-500 mb-2">설명</h2>
                                    <p className="text-gray-700">{selectedCommand.description}</p>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-500 mb-2">사용 예시</h2>
                                    <p className="text-gray-700">{selectedCommand.example}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                {selectedCategory ? (
                                    <>
                                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                                            {selectedCategory} 명령어
                                        </h2>
                                        <p className="text-gray-500">
                                            왼쪽 목록에서 명령어를 선택하면 자세한 정보를 볼 수 있습니다.
                                        </p>
                                    </>
                                ) : (
                                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                                        카테고리를 선택하세요
                                    </h2>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commands;
