import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

// User 모델의 속성 인터페이스
interface UserAttributes {
    id: number;
    discordId: string;
    username: string;
    globalName: string | null;
    avatarUrl: string | null;
    userLanguage: string | null;
    recentMessages: string | null;
    lastActive: Date | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// 생성 시 선택적 속성들
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// User 모델 클래스
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public discordId!: string;
    public username!: string;
    public globalName!: string | null;
    public avatarUrl!: string | null;
    public userLanguage!: string | null;
    public recentMessages!: string | null;
    public lastActive!: Date | null;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // 연관관계 메서드
    public async updateLastActive(): Promise<void> {
        this.lastActive = new Date();
        await this.save();
    }

    // 최근 메시지 배열 가져오기
    public getRecentMessagesArray(): string[] {
        try {
            return JSON.parse(this.recentMessages || "[]");
        } catch {
            return [];
        }
    }

    // 최근 메시지 배열 설정
    public setRecentMessagesArray(messages: string[]): void {
        this.recentMessages = JSON.stringify(messages.slice(-10)); // 최대 10개만 저장
    }

    // 새 메시지 추가
    public addRecentMessage(message: string): void {
        const messages = this.getRecentMessagesArray();
        messages.push(message);
        this.setRecentMessagesArray(messages);
    }
}

// 모델 초기화
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        discordId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        globalName: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        avatarUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userLanguage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recentMessages: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        lastActive: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: "users",
        sequelize,
        timestamps: true,
    }
);

export default User;
