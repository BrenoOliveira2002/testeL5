import ProdutoRepository from "../repository/ProdutoRepository";
import { produtoInterface } from "../../types/produto/produtoInterface";


class ProdutoService {
  static async getAllUsers() {
    return await ProdutoRepository.getAllProducts();
  }

}

export default ProdutoService;
