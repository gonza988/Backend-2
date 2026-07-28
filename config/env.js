import dotenv from "dotenv";

dotenv.config();

const DEFAULT_LOCAL_MONGO = "mongodb://127.0.0.1:27017/plataforma-eventos";

const mongoUrl = process.env.MONGO_URL?.trim() || DEFAULT_LOCAL_MONGO;

export const env = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "dev_secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
    mongoUrl,
    mongoTarget: process.env.MONGO_URL?.trim() ? "cloud" : "local",
    seedData: process.env.SEED_DATA !== "false"
};