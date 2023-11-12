import { PrismaClient } from "@prisma/client";
import { produtoInterface } from "../../types/produto/produtoInterface";

const prisma = new PrismaClient();

class ProductRepository {
  async listProducts() {
    try{
      return prisma.produtos.findMany()
  }
  catch(err) {
    console.log(err)
  }
}

public async getProdocutById(id?: number, type?: string) {
  try{
    return prisma.produtos.findMany({
      where: {
        id
      }
    })
}
catch(err) {
  console.log(err)
}

  return prisma.clusters;
}

}

export default new ProductRepository();
