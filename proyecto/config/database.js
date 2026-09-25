import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try{
    await mongoose.connect(env.MONGO_URL,{
        dbName: "Prueba de mongodb",
    }

    );
    console.log(`MongoDB conectado`);
}catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Salir del proceso con un código de error
}   
};


/*
export const connectDB = async () => {
    await mongoose.connect(env.mongoUrl);
    console.log(`MongoDB conectado (${env.mongoTarget})`);
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
};
*/