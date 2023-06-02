import express from "express";
import routes from "./routes/index"; // Importa o arquivo index.js do diretório "routes"

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use(routes);

export default app;
