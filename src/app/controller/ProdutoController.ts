import { Request, Response } from "express";
import ProdutoService from "../service/ProdutoService";
import { produtoInterface } from "../../types/produto/produtoInterface";

class ProdutoController {
  public async GetAllProducts(req: Request, res: Response) {
    try {
      const { nome, cpf, email, phone } = req.query;
      // const produtoDTO: produtoInterface = {
      //   nome: nome?.toString() || "",
      //   cpf: cpf?.toString() || "",
      //   email: email?.toString() || "",
      //   phone: phone?.toString() || "",
      // };

      const products = await ProdutoService.getAllUsers();
      res.json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os usuários." });
    }
  }
}

export default new ProdutoController();
