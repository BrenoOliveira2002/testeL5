import { PrismaClient } from "@prisma/client";
import { produtoInterface } from "../../types/produto/produtoInterface";

const prisma = new PrismaClient();

class ClientRepository {
  public async getClientSeg() {
    try{
      return prisma.$queryRawUnsafe(`
      select b.nome,b.idade,b.endereco,a.descricao as PerfilDoCliente,d.nome,d.categoria,c.data_venda,c.id as idvenda,d.preco
	from clusters a 
	join clientes_cluster b on a.cluster = b.cluster
	join pessoas b1 on b1.nome =  b.nome
				   and b1.idade = b.idade
				   and b1.endereco = b.endereco
	join vendas c on c.id_cliente = b1.id
	join produtos d on d.id = c.id_produto`)
  }
  catch(err) {
    console.log(err)
  }

    return prisma.clusters;
}

public async getClientSeg(segmentacao) {
    try{
      return prisma.clientes_cluster.findMany({
        where: {
            cluster: segmentacao
        },
        select: {
            nome: true,
            idade: true
        }
      })
    }
  catch(err) {
    console.log(err)
  }

    return prisma.clusters;
}

}

export default new ClientRepository();
