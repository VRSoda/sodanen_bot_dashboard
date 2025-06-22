import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
    joinGuild: (guildId: string) => void;
    leaveGuild: (guildId: string) => void;
    onGuildStatsUpdate: (guildId: string, callback: (data: any) => void) => void;
    onGlobalStatsUpdate: (callback: (data: any) => void) => void;
    offGuildStatsUpdate: (guildId: string) => void;
    offGlobalStatsUpdate: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [guildStatsCallbacks, setGuildStatsCallbacks] = useState<Map<string, (data: any) => void>>(new Map());
    const [globalStatsCallbacks, setGlobalStatsCallbacks] = useState<((data: any) => void)[]>([]);

    useEffect(() => {
        // Socket.IO 연결
        const newSocket = io("http://localhost:3001", {
            withCredentials: true,
        });

        newSocket.on("connect", () => {
            console.log("Socket.IO 연결됨:", newSocket.id);
            setConnected(true);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket.IO 연결 해제됨");
            setConnected(false);
        });

        // 서버별 통계 업데이트 리스너
        newSocket.on("guild-stats-update", (data) => {
            const { guildId, ...updateData } = data;
            const callback = guildStatsCallbacks.get(guildId);
            if (callback) {
                callback(updateData);
            }
        });

        // 전체 통계 업데이트 리스너
        newSocket.on("global-stats-update", (data) => {
            globalStatsCallbacks.forEach((callback) => {
                callback(data);
            });
        });

        newSocket.on("command-executed", (data) => {
            console.log("새로운 명령어 실행:", data);
            // 여기서 필요한 UI 업데이트 로직 추가
        });

        newSocket.on("guild-updated", (data) => {
            console.log("서버 설정 업데이트:", data);
            // 여기서 필요한 UI 업데이트 로직 추가
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [guildStatsCallbacks, globalStatsCallbacks]);

    const joinGuild = (guildId: string) => {
        if (socket) {
            socket.emit("join-guild", guildId);
        }
    };

    const leaveGuild = (guildId: string) => {
        if (socket) {
            socket.emit("leave-guild", guildId);
        }
    };

    const onGuildStatsUpdate = useCallback((guildId: string, callback: (data: any) => void) => {
        setGuildStatsCallbacks((prev) => new Map(prev).set(guildId, callback));
    }, []);

    const onGlobalStatsUpdate = useCallback((callback: (data: any) => void) => {
        setGlobalStatsCallbacks((prev) => [...prev, callback]);
    }, []);

    const offGuildStatsUpdate = useCallback((guildId: string) => {
        setGuildStatsCallbacks((prev) => {
            const newMap = new Map(prev);
            newMap.delete(guildId);
            return newMap;
        });
    }, []);

    const offGlobalStatsUpdate = useCallback(() => {
        setGlobalStatsCallbacks([]);
    }, []);

    const value: SocketContextType = {
        socket,
        connected,
        joinGuild,
        leaveGuild,
        onGuildStatsUpdate,
        onGlobalStatsUpdate,
        offGuildStatsUpdate,
        offGlobalStatsUpdate,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
