import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    guilds: any[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            console.log("🔍 인증 상태 확인 중...");
            console.log("📡 서버 URL:", SERVER_URL);

            const response = await fetch(`${SERVER_URL}/auth/status`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("📊 응답 상태:", response.status);
            console.log("📊 응답 헤더:", Object.fromEntries(response.headers.entries()));

            if (response.ok) {
                const data = await response.json();
                console.log("✅ 인증 상태 데이터:", data);

                if (data.authenticated && data.user) {
                    console.log("🔓 사용자 인증됨:", data.user);
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    console.log("🔒 사용자 인증되지 않음");
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                console.log("❌ 인증 상태 확인 실패:", response.status, response.statusText);
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("🚨 인증 상태 확인 중 오류:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        window.location.href = "/api/auth/discord";
    };

    const logout = async () => {
        try {
            console.log("🚪 로그아웃 시도 중...");
            const response = await fetch(`${SERVER_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
            });

            console.log("📊 로그아웃 응답:", response.status);

            if (response.ok) {
                console.log("✅ 로그아웃 성공");
                setUser(null);
                setIsAuthenticated(false);
                window.location.href = "/";
            } else {
                console.log("❌ 로그아웃 실패:", response.status);
            }
        } catch (error) {
            console.error("🚨 로그아웃 중 오류:", error);
        }
    };

    useEffect(() => {
        console.log("🚀 AuthProvider 마운트됨");
        checkAuthStatus();

        // URL 변경 감지 (OAuth 콜백 후 페이지 새로고침 방지)
        const handleUrlChange = () => {
            console.log("🔗 URL 변경 감지:", window.location.href);
            if (window.location.search.includes("code=") || window.location.search.includes("error=")) {
                console.log("🔄 OAuth 콜백 감지, 인증 상태 재확인");
                setTimeout(() => {
                    checkAuthStatus();
                }, 1000);
            }
        };

        // 초기 로드 시 확인
        handleUrlChange();

        // popstate 이벤트 리스너 추가
        window.addEventListener("popstate", handleUrlChange);

        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
    };

    console.log("🔄 AuthContext 상태 업데이트:", { user, isAuthenticated, loading });

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
