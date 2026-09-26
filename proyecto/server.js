import app from "./app.js";
import { env } from "./config/env.js";

app.listen(8080, () => {
    console.log(`Servidor escuchando en http://localhost:${env.PORT}`);
});