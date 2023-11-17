import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClientRepository {

    public async listClientBySeg(segmentacao: string) {
  try {
    return prisma.$queryRawUnsafe(`
    SELECT
    c.id AS cliente_id,
    c.nome AS cliente_nome,
    c.idade AS cliente_idade,
    c.endereco AS cliente_endereco,
    c.cluster AS cliente_cluster,
    json_agg(json_build_object(
      'produto_nome', p.nome,
      'produto_preco', p.preco,
      'data_compra', v.data_venda
    )) AS compras,
    false AS open 
  FROM
    clientes c
  LEFT JOIN
    vendas v ON c.id = v.id_cliente
  LEFT JOIN
    produtos p ON v.id_produto = p.id
  WHERE
    c.cluster = $1
  GROUP BY
    c.id, c.nome, c.idade, c.endereco, c.cluster
  ORDER BY
    c.id;
    `, segmentacao);
  } catch (err) {
    console.error(err);
    throw err;
  }
}


}

export default new ClientRepository();
