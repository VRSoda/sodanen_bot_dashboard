import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

interface AnnouncementAttributes {
    id: number;
    title: string;
    content: string;
    authorId: string | null;
    authorName: string | null;
}

interface AnnouncementCreationAttributes extends Optional<AnnouncementAttributes, "id"> {}

class Announcement extends Model<AnnouncementAttributes, AnnouncementCreationAttributes> implements AnnouncementAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public authorId!: string | null;
    public authorName!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Announcement.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorId: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        authorName: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "announcements",
        sequelize: sequelize,
    }
);

export default Announcement;
