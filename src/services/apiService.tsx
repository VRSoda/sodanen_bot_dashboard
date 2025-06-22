import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;

export interface User {
    id: string;
    username: string;
    avatar: string | null;
    accessToken: string;
}

export async function loginWithCode(code: string) {
    try {
        const response = await apiClient.post("/auth/login", { code });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("loginWithCode error:", error.message || error);
        return { success: false, error: error.message || "Unknown error" };
    }
}

export function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
}

export function getLoginUrl() {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI);
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify guilds`;
}

export async function getServers() {
    try {
        const token = localStorage.getItem("auth_token");
        const response = await apiClient.get("/servers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("getServers error:", error.message || error);
        return { success: false, error: error.message || "Unknown error" };
    }
}

export function getServerIconUrl(server: { id: string; icon: string | null }) {
    if (!server.icon) return null;
    return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
}

export function getServerBackgroundColor(serverId: string) {
    const colors = ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-pink-100", "bg-yellow-100"];
    const index = serverId.charCodeAt(0) % colors.length;
    return colors[index];
}

export function getBotInviteUrl(serverId: string) {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID!;
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8&guild_id=${serverId}&disable_guild_select=true&response_type=code`;
}

export async function getCurrentUser() {
    try {
        const token = localStorage.getItem("auth_token");
        const response = await apiClient.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("getCurrentUser error:", error.message || error);
        return { success: false, error: error.message || "Unknown error" };
    }
}

export function getUserAvatarUrl(user: { id: string; avatar: string | null }): string | undefined {
    if (!user.avatar) return undefined;
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
}
