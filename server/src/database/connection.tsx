import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// MariaDB 연결 설정
export const sequelize = new Sequelize({
    database: process.env.DB_NAME || "sodanen_bot",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mariadb",
    dialectOptions: {
        connectTimeout: 60000,
        acquireTimeout: 60000,
        timeout: 60000,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});

// 데이터베이스 연결 테스트
export const testConnection = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        console.log("✅ MariaDB 연결이 성공적으로 설정되었습니다.");
        return true;
    } catch (error) {
        console.error("❌ MariaDB 연결에 실패했습니다:", error);
        return false;
    }
};

// 데이터베이스 초기화
export const initializeDatabase = async (): Promise<boolean> => {
    try {
        const connected = await testConnection();
        if (!connected) {
            return false;
        }

        try {
            console.log("✅ 데이터베이스가 초기화되었습니다.");
            return true;
        } finally {
        }
    } catch (error) {
        console.error("❌ 데이터베이스 초기화 실패:", error);
        return false;
    }
};

export default sequelize;
