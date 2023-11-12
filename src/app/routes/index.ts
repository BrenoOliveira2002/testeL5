import { Router } from "express";
import produtosRouter from "./produtos/produtosRoutes"
import clientRouter from "./clientes/clientRoutes";
const routes = Router();


routes.use("/produtos", produtosRouter);
routes.use("/clientes", clientRouter)



export default routes;
