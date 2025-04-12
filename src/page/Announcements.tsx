// src/page/Announcements.tsx
import { useState, useEffect } from "react";
import { supabase } from "../src/supabaseClient";

interface Announcement {
    id: number;
    title: string;
    content: string;
    date: string;
}

const Announcements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const time = date.toLocaleTimeString("ko-KR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${year}-${month}-${day} ${time}`;
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.from("Dashboard_announcements").select("*").order("date", { ascending: false });
                if (error) {
                    throw error;
                }
                setAnnouncements(data || []);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return <div className="container mx-auto p-6">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-6">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6 transform translate-y-5 opacity-0 animate-slide-up bg-[url('./img/bg-pattern.svg')] bg-cover relative animated-background">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">공지사항</h1>
            {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">{announcement.title}</h2>
                        <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 text-right">
                        <span className="text-sm text-gray-500">작성일: {formatDate(announcement.date)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Announcements;
