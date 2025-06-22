import { User } from "./services/apiService";

export interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
}

export interface UserData extends User {
    // 추가로 필요한 필드가 있다면..
}
