// 클라이언트용 StatsService - API 호출을 통해서만 데이터 접근
import apiClient from "./apiService";

export const getGuildStats = async (guildId: string) => {
    try {
        const response = await apiClient.get(`/stats/guild/${guildId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching guild stats:", error);
        throw error;
    }
};

export const getGlobalStats = async () => {
    try {
        const response = await apiClient.get("/stats/overview");
        return response.data;
    } catch (error) {
        console.error("Error fetching global stats:", error);
        throw error;
    }
};
