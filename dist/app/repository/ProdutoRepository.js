"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    async getAllProducts() {
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
}
exports.default = new ProductRepository();
