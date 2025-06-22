import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

// Guild 모델의 속성 인터페이스
interface GuildAttributes {
    id: number;
    guildId: string;
    name: string;
    iconUrl: string | null;
    ownerId: string;
    memberCount: number;
    prefix: string;
    settings: object;
    translationEnabled: boolean;
    translationSourceLang: string;
    translationTargetLang: string;
    translationExcludedChannels: string | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// 생성 시 선택적 속성들
interface GuildCreationAttributes extends Optional<GuildAttributes, "id"> {}

// Guild 모델 클래스
class Guild extends Model<GuildAttributes, GuildCreationAttributes> implements GuildAttributes {
    public id!: number;
    public guildId!: string;
    public name!: string;
    public iconUrl!: string | null;
    public ownerId!: string;
    public memberCount!: number;
    public prefix!: string;
    public settings!: object;
    public translationEnabled!: boolean;
    public translationSourceLang!: string;
    public translationTargetLang!: string;
    public translationExcludedChannels!: string | null;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 모델 초기화
Guild.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        guildId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        iconUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ownerId: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        memberCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        prefix: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "!",
        },
        settings: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {},
        },
        translationEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        translationSourceLang: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "ko",
        },
        translationTargetLang: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "ja",
        },
        translationExcludedChannels: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: "guilds",
        sequelize,
        timestamps: true,
    }
);

export default Guild;
