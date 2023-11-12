import ProdutoRepository from "../repository/ProdutoRepository";


class ProdutoService {
  static async listAllProducts() {
    return await ProdutoRepository.listProducts();
  }

  static async getProductAllInfo(id: number){
    return await ProdutoRepository.getAllInfoProduct(id)
  }

  static async listProdocutByIdAndType(id: string, type?: string) {
    return await ProdutoRepository.getProductById(parseInt(id), type);
  }


}

export default ProdutoService;
