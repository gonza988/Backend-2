
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";

const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${env.PORT}`);
  });
};

start();