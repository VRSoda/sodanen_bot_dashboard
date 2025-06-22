import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import LoggedInDashboard from "./LoggedInDashboard";
import { UserData } from "../types";
import apiClient from "../services/apiService";

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get("/auth/user");
                setUserData(response.data);
            } catch (error) {
                console.error("사용자 데이터 로드 오류:", error);
                setError("사용자 정보를 가져올 수 없습니다. 다시 로그인해주세요.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <Box sx={{ textAlign: "center" }}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                        사용자 정보를 불러오는 중...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (error || !userData) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <Typography variant="h6" color="error">
                    {error || "사용자 정보를 찾을 수 없습니다."}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <LoggedInDashboard userData={userData} />
        </Box>
    );
};

export default Dashboard;
