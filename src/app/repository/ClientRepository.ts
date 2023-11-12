import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClientRepository {

public async listClientBySeg(segmentacao: string) {
  try {
    return prisma.$queryRawUnsafe(`
      SELECT
        p.nome,
        p.idade,
        c.cluster AS perfil_cliente
      FROM
        pessoas p
      JOIN
        clientes c ON p.nome = c.nome
      WHERE
        c.cluster = 1;
    `, segmentacao);
  } catch (err) {
    console.error(err);
    throw err;
  }
  
}

}

export default new ClientRepository();
