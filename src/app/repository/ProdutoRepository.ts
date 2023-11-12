import { PrismaClient } from "@prisma/client";

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

public async getProductById(id?: number, type?: string) {
  try {

    let paymentType;

    switch (type) {
      case 'debito':
        paymentType = 1;
        break;
      case 'boleto':
        paymentType = 2;
        break;
      case 'pix':
        paymentType = 3;
        break;
      case 'credito':
        paymentType = 4;
        break;
      default:
        throw new Error('Tipo de pagamento inválido');
    }

    return prisma.$queryRawUnsafe(`
      WITH VendasProduto AS (
        SELECT
          v.id,
          v.id_cliente,
          v.data_venda,
          v.pagamento,
          pr.id AS id_produto,
          pr.nome AS nome_produto,
          pr.categoria,
          pr.preco
        FROM
          vendas v
        JOIN
          produtos pr ON v.id_produto = pr.id
        WHERE
          pr.id = $1 AND v.pagamento = CAST($2 AS INTEGER)
      )
  
      SELECT
        c.id AS cliente_id,
        c.nome AS nome_cliente,
        vp.data_venda,
        json_agg(json_build_object(
          'produto_comprado', vp.nome_produto,
          'categoria_comprada', vp.categoria,
          'preco_comprado', vp.preco
        )) AS produtos_comprados_junto
      FROM
        clientes c
      JOIN
        VendasProduto vp ON c.id = vp.id_cliente
      GROUP BY
        c.id, c.nome, vp.data_venda
      ORDER BY
        c.id, vp.data_venda;
    `, id, paymentType);
  } catch (err) {
    console.error(err);
    throw err;
  }
  
  
}

public async getAllInfoProduct(id: number){
  try{
  return await prisma.$queryRawUnsafe(`
  SELECT
  p.id AS produto_id,
  p.nome AS produto_nome,
  p.categoria AS produto_categoria,
  CAST(p.preco AS INTEGER) AS produto_preco,
  json_agg(json_build_object(
    'id_venda', v.id,
    'id_cliente', v.id_cliente,
    'data_venda', v.data_venda,
    'tipo_pagamento', CASE v.pagamento
                        WHEN 1 THEN 'débito'
                        WHEN 2 THEN 'boleto'
                        WHEN 3 THEN 'pix'
                        WHEN 4 THEN 'credito'
                        ELSE 'null'
                      END
  )) AS historico_vendas,
  CAST(COUNT(*) FILTER(WHERE v.pagamento = 1) AS INTEGER) AS débito,
  CAST(COUNT(*) FILTER(WHERE v.pagamento = 2) AS INTEGER) AS boleto,
  CAST(COUNT(*) FILTER(WHERE v.pagamento = 3) AS INTEGER) AS pix,
  CAST(COUNT(*) FILTER(WHERE v.pagamento = 4) AS INTEGER) AS credito,
  (
    SELECT 
      json_agg(json_build_object(
        'mes', mes,
        'quantidade', quantidade
      )) AS quantidade_por_mes
    FROM (
      SELECT
        EXTRACT(MONTH FROM v.data_venda) AS mes,
        COUNT(*) AS quantidade
      FROM vendas v
      WHERE p.id = v.id_produto
      GROUP BY mes
      ORDER BY mes
    ) AS subquery
  ) AS quantidade_por_mes,
  json_agg(json_build_object(
    'produto_consequentemente_comprado', r.produto_consequentemente_comprado,
    'confianca', r.confianca,
    'lift', r.lift
  )) AS recomendacoes
FROM
  produtos p
LEFT JOIN
  vendas v ON p.id = v.id_produto
LEFT JOIN
  recomendacoes r ON p.nome = r.produto_analisado -- Substitua essa condição pela condição correta
WHERE
  p.id = ${id}
GROUP BY
  p.id, p.nome, p.categoria, p.preco
ORDER BY
  p.id;

`)
  }
  catch(err){
    console.log(err)
  }
}

}

export default new ProductRepository();
