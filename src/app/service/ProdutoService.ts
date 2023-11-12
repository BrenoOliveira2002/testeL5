import ProdutoRepository from "../repository/ProdutoRepository";


class ProdutoService {
  static async listAllProducts() {
    return await ProdutoRepository.listProducts();
  }

  static async getProdocutById(id: string, type?: string) {
    return await ProdutoRepository.getProdocutById(parseInt(id), type);
  }

  static async get(id: string, type?: string) {
    return await ProdutoRepository.getProdocutById(parseInt(id), type);
  }
}

export default ProdutoService;
