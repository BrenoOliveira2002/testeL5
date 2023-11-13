import express from "express";
import routes from "./routes/index";
const cors = require('cors');


const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
