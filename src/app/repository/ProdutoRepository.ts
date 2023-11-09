import { Media, PrismaClient, User } from "@prisma/client";
import { produtoInterface } from "../../types/produto/produtoInterface";

const prisma = new PrismaClient();

class ProductRepository {
  public async getAllProducts() {
    // try{
    // console.log("chegou aqui")
    // const { nome, cpf, email, phone } = userDTO;

  //   if (nome) {
  //     return prisma.produtos.findMany({
  //       where: {
  //         nome: { contains: nome },
  //       },
  //     });
  //   } else if (cpf) {
  //     return prisma.user.findUnique({
  //       where: {
  //         cpf,
  //       },
  //     });
  //   } else if (email) {
  //     return prisma.user.findUnique({
  //       where: {
  //         email,
  //       },
  //     });
  //   } else if (phone) {
  //     return prisma.user.findUnique({
  //       where: {
  //         phone,
  //       },
  //     });
  //   }
  // }
  // catch(err) {
  //   console.log(err)
  // }

    return prisma.produtos.findMany();
}

  public async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: id } });
  }

  public async getUserByPhone(phone: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { phone } });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }  

  public async getMediaByID(id: number): Promise<Media | null> {
    return prisma.media.findUnique({
      where: { id },
    });
  }
}

export default new ProductRepository();
