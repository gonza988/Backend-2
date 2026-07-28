import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    await mongoose.connect(env.mongoUrl);
    console.log(`MongoDB conectado (${env.mongoTarget})`);
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
};