// Discord OAuth2 및 API 관련 서비스

// Discord OAuth2 설정
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRE;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || window.location.origin;
const DISCORD_API_URL = "https://discord.com/api/v10";

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: number;
}

export interface DiscordServer {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
    approximate_member_count?: number;
}

/**
 * Discord 로그인 URL 생성
 */
export function getDiscordAuthUrl(): string {
    const scope = "identify guilds";
    const authUrl = `${DISCORD_API_URL}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;
    return authUrl;
}

/**
 * 코드를 토큰으로 교환
 * 참고: 실제 구현에서는 보안을 위해 백엔드에서 처리하는 것이 좋음
 */
export async function exchangeCodeForToken(code: string): Promise<any> {
    try {
        const body = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
        });

        const response = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`토큰 교환 실패: ${errorData.error}`);
        }

        return await response.json();
    } catch (error) {
        console.error("토큰 교환 중 오류:", error);
        throw error;
    }
}

/**
 * Discord 사용자 정보 가져오기
 */
export async function fetchDiscordUser(token: string): Promise<DiscordUser> {
    try {
        const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }

        const userData = await response.json();
        return {
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar,
            discriminator: userData.discriminator || "0",
            accessToken: token,
        };
    } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error);
        throw error;
    }
}

/**
 * Discord 서버 목록 가져오기
 */
export async function fetchDiscordServers(token: string): Promise<DiscordServer[]> {
    try {
        const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("서버 목록을 가져오는 데 실패했습니다.");
        }

        return await response.json();
    } catch (error) {
        console.error("서버 목록 가져오기 오류:", error);
        throw error;
    }
}

/**
 * 토큰의 유효성 검사
 */
export async function validateToken(token: string): Promise<boolean> {
    try {
        const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.ok;
    } catch (error) {
        console.error("토큰 유효성 검사 오류:", error);
        return false;
    }
}

/**
 * Discord에서 로그아웃
 * 참고: 토큰을 무효화하려면 백엔드 구현이 필요
 */
export function logoutDiscord(): void {
    localStorage.removeItem("discord_token");
    localStorage.removeItem("discord_user");
    // 추가 정리 작업이 필요한 경우 여기에 구현
}

/**
 * 서버 아이콘 URL 생성
 */
export function getServerIconUrl(server: DiscordServer): string | null {
    if (!server.icon) return null;
    return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
}

/**
 * 사용자 아바타 URL 생성
 */
export function getUserAvatarUrl(user: DiscordUser): string {
    if (!user.avatar) {
        // 아바타가 없는 경우 기본 아바타 URL 반환
        const defaultAvatarNumber = parseInt(user.discriminator) % 5;
        return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    }
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
}

/**
 * 서버 배경색 생성 (랜덤)
 */
export function getServerBackgroundColor(serverId: string): string {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];

    // 서버 ID를 기반으로 일관된 색상 반환
    const index = parseInt(serverId) % colors.length;
    return colors[index];
}
