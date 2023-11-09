import { Router } from "express";
import produtoController from "../../controller/ProdutoController";
import UserValidation from "../../../validation/ProductValidation";

const produtosRouter = Router();

produtosRouter
 
  .get("/produtos", produtoController.GetAllProducts)


export default produtosRouter;
