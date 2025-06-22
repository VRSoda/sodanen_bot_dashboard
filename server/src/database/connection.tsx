import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// MariaDB 연결 설정 (기존 봇과 동일한 데이터베이스 사용)
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
            // 외래 키 제약 조건 비활성화 (테이블 재생성 오류 방지)
            // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

            // 데이터베이스 스키마 동기화 (봇이 테이블을 관리하므로 주석 처리)
            // const syncOptions = {
            //     alter: process.env.NODE_ENV === "production",
            //     force: process.env.NODE_ENV !== "production",
            // };
            // await sequelize.sync(syncOptions);
            // console.log(`✅ 데이터베이스 스키마가 성공적으로 동기화되었습니다. (Options: ${JSON.stringify(syncOptions)})`);

            console.log("✅ 데이터베이스가 초기화되었습니다.");
            return true;
        } finally {
            // 외래 키 제약 조건 다시 활성화
            // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
        }
    } catch (error) {
        console.error("❌ 데이터베이스 초기화 실패:", error);
        return false;
    }
};

export default sequelize;
