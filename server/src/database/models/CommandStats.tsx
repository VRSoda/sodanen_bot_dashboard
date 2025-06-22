import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

// CommandStats 모델의 속성 인터페이스
interface CommandStatsAttributes {
    id: number;
    userId: string;
    guildId: string;
    commandName: string;
    count: number;
    totalExecutionTime: number;
    successCount: number;
    failureCount: number;
    lastExecuted: Date;
    averageExecutionTime: number;
    lastChannelId: string | null;
    lastErrorMessage: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

// 생성 시 선택적 속성들
interface CommandStatsCreationAttributes extends Optional<CommandStatsAttributes, "id" | "createdAt" | "updatedAt"> {}

// CommandStats 모델 클래스
class CommandStats extends Model<CommandStatsAttributes, CommandStatsCreationAttributes> implements CommandStatsAttributes {
    public id!: number;
    public userId!: string;
    public guildId!: string;
    public commandName!: string;
    public count!: number;
    public totalExecutionTime!: number;
    public successCount!: number;
    public failureCount!: number;
    public lastExecuted!: Date;
    public averageExecutionTime!: number;
    public lastChannelId!: string | null;
    public lastErrorMessage!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 모델 초기화
CommandStats.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        commandName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        totalExecutionTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        successCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        failureCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        lastExecuted: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        averageExecutionTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        lastChannelId: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        lastErrorMessage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "command_stats",
        sequelize,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["guildId", "commandName", "userId"],
                name: "unique_user_guild_command",
            },
            {
                fields: ["lastExecuted"],
            },
        ],
    }
);

export default CommandStats;
