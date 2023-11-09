import { Router } from "express";
import produtosRouter from "./produtos/userRoutes"
const routes = Router();

routes.use("/produtos", produtosRouter);



export default routes;
