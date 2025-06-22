import React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number | React.ReactNode;
    icon: React.ReactNode;
    color?: string;
    onClick?: () => void;
    loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, onClick, loading = false }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                p: "24px",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid var(--sky-border)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
                transition: "all 0.3s ease",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: onClick ? "pointer" : "default",
                "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 12px 40px rgba(147, 149, 171, 0.15)",
                    borderColor: "var(--sky-primary)",
                },
                "@media (max-width: 1024px)": {
                    p: "20px",
                    minHeight: "160px",
                },
                "@media (max-width: 768px)": {
                    p: "16px",
                    minHeight: "auto",
                },
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 0,
                    "&:last-child": {
                        pb: 0,
                    },
                }}
            >
                <Box
                    sx={{
                        fontSize: "28px",
                        mb: "16px",
                        color: "var(--sky-primary-dark)",
                        background: "rgba(135, 206, 235, 0.15)",
                        borderRadius: "50%",
                        width: "64px",
                        height: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                            transform: "scale(1.1) rotate(5deg)",
                            background: "rgba(135, 206, 235, 0.25)",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                        },
                        "@media (max-width: 1024px)": {
                            width: "56px",
                            height: "56px",
                            fontSize: "24px",
                        },
                        "@media (max-width: 768px)": {
                            width: "52px",
                            height: "52px",
                            fontSize: "22px",
                            mb: "12px",
                        },
                    }}
                >
                    {loading ? <Skeleton variant="circular" width={40} height={40} /> : icon}
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "2.25rem",
                        color: "var(--sky-text-primary)",
                        mb: "4px",
                        fontFamily: "Roboto, sans-serif",
                        "@media (max-width: 1024px)": {
                            fontSize: "2rem",
                        },
                        "@media (max-width: 768px)": {
                            fontSize: "1.75rem",
                        },
                    }}
                >
                    {loading ? <Skeleton variant="text" width={80} height={40} /> : value}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                        color: "var(--sky-text-secondary)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        "@media (max-width: 1024px)": {
                            fontSize: "0.85rem",
                        },
                        "@media (max-width: 768px)": {
                            fontSize: "0.8rem",
                        },
                    }}
                >
                    {loading ? <Skeleton variant="text" width={100} height={20} /> : title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatCard;
