import { Router } from "express";
import produtoController from "../../controller/ProdutoController";

const produtosRouter = Router();

produtosRouter
 
  .get("/", produtoController.GetAllProducts)
  .get("/info", produtoController.GetAllInforProduct)
  .get("/info/vendas", produtoController.GetProductByIdAndType)

  


export default produtosRouter;
