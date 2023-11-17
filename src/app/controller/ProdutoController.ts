import { Request, Response } from "express";
import ProdutoService from "../service/ProdutoService";

class ProdutoController {
  public async GetAllProducts(req: Request, res: Response) {
    try {
      const products = await ProdutoService.listAllProducts();
      res.json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os produtos." });
    }
  }

  public async GetProductByIdAndType(req: Request, res: Response) {
    try {
      
        req.query.type =  req.query.type?.toString() || ""
        req.query.id =  req.query.id?.toString() || ""

        const products = await ProdutoService.listProdocutByIdAndType(req.query.id, req.query.type);
        res.json(products); 
    }
     catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os produtos." });
    }
  }

  public async GetAllInforProduct(req: Request, res: Response){
    try{
        req.query.id =  req.query.id?.toString() || ""
        const products = await ProdutoService.getProductAllInfo(parseInt(req.query.id));

        res.json(products); 
    }catch(error){
      console.log(error)
    }
  }

}

export default new ProdutoController();
