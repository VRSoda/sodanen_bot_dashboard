import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaLock, FaMusic, FaLanguage } from "react-icons/fa";

interface Command {
    name: string;
    description: string;
    example: string;
    category: string;
}

const categoryIcons: { [key: string]: React.FC } = {
    일반: FaCog,
    관리: FaLock,
    음악: FaMusic,
    번역: FaLanguage,
};

const Commands: React.FC = () => {
    const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

    const commands: Command[] = [
        {
            name: "/1",
            description: "ㄹㅇㄹㄴㅇㄹㄹ",
            example: "/1",
            category: "일반",
        },
        {
            name: "/2",
            description: "ㅇㄴㄹㅇㄴㄹㅇ.",
            example: "/1",
            category: "관리",
        },
        {
            name: "/3",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "음악",
        },
        {
            name: "/4",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "번역",
        },
        {
            name: "/5",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "번역",
        },
        {
            name: "/6",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "번역",
        },
        {
            name: "/7",
            description: "ㄴㅇㄹㄴㅇㄹ",
            example: "/1",
            category: "번역",
        },
    ];

    const categories = ["일반", "관리", "음악", "번역"];

    const handleCommandClick = (command: Command) => {
        setSelectedCommand(command);
    };

    const commandInfoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-slide-up", "opacity-100", "translate-y-0");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.01,
            }
        );

        const currentRef = commandInfoRef.current;

        if (currentRef) {
            currentRef.classList.remove("animate-slide-up", "opacity-100", "translate-y-0");
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [selectedCommand]);

    return (
        <div className="transition-all duration-500 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative animated-background">
            <div className="container mx-auto flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 bg-white shadow-lg rounded-2xl p-4">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">명령어 목록</h2>
                    <ul className="space-y-2">
                        {categories.map((category) => {
                            const Icon = categoryIcons[category] || FaCog;
                            return (
                                <li key={category}>
                                    <div className="flex items-center gap-2">
                                        {(Icon as any)({ style: { color: "gray" } })}
                                        <h3 className="text-md font-semibold mb-1 text-gray-600">{category}</h3>
                                    </div>
                                    <ul className="space-y-2 mt-2">
                                        {commands
                                            .filter((command) => command.category === category)
                                            .map((command) => (
                                                <li key={command.name}>
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
                            );
                        })}
                    </ul>
                </div>

                <div className="md:w-3/4 bg-white shadow-lg rounded-2xl p-6">
                    <div ref={commandInfoRef} className="transition-opacity duration-75 transform translate-y-1 opacity-0">
                        {selectedCommand && (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commands;
