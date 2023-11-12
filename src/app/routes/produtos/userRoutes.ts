import { Router } from "express";
import produtoController from "../../controller/ProdutoController";

const produtosRouter = Router();

produtosRouter
 
  .get("/produtos", produtoController.GetAllProducts)


export default produtosRouter;
