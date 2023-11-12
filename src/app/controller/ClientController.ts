import { Request, Response } from "express";
import ProdutoService from "../service/ProdutoService";
import { produtoInterface, reqProduto } from "../../types/produto/produtoInterface";
import ProductValidation from "../../validation/ProductValidation";

class ClientController {

  public async listClientWithSegmentation(req: Request, res: Response) {
    try {
      const clientPurchases = await ClientService.getProdocutById();
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os compras do client." });
    }
  }

  public async listClientPurchases(req: Request, res: Response) {
    try {
      const { id} = req.query;
      id: id?.toString() || ""
      const clientPurchases = await ClientService.getProdocutById();
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os compras do client." });
    }
  }
}

export default new ClientController();
