import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductRepository {
  async listProducts() {
    try {
      return await prisma.produtos.findMany({
        orderBy: {
          nome: 'asc', 
        },
      });
    } catch (err) {
      console.error(err);
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
        v.id_cliente,
        v.data_venda,
        pr.id AS id_produto_comprado,
        pr.nome AS nome_produto_comprado,
        pr.categoria AS categoria_comprada,
        pr.preco AS preco_comprado
      FROM
        vendas v
      JOIN
        produtos pr ON v.id_produto = pr.id
      WHERE
        v.id_cliente IN (
          SELECT id_cliente
          FROM vendas
          WHERE id_produto = $1 AND pagamento = CAST($2 AS INTEGER)
        )
        AND pr.id <> $1
        AND v.data_venda IN (
          SELECT data_venda
          FROM vendas
          WHERE id_produto = $1 AND pagamento = CAST($2 AS INTEGER)
        )
    )
    
    SELECT
      c.id AS cliente_id,
      c.nome AS nome_cliente,
      vp.data_venda,
      json_agg(json_build_object(
        'produto_comprado', vp.nome_produto_comprado,
        'categoria_comprada', vp.categoria_comprada,
        'preco_comprado', vp.preco_comprado
      )) AS produtos_comprados_junto,
      false AS open 
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

public async getAllInfoProduct(id: number) {
  try {
    return await prisma.$queryRawUnsafe(`
    SELECT
    p.id AS produto_id,
    p.nome AS produto_nome,
    p.categoria AS produto_categoria,
    p.url_photo AS url_photo,
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
        json_build_array(
          COALESCE(SUM(CASE WHEN mes = 1 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 2 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 3 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 4 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 5 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 6 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 7 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 8 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 9 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 10 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 11 THEN quantidade END), 0),
          COALESCE(SUM(CASE WHEN mes = 12 THEN quantidade END), 0)
        ) AS quantidade_por_mes
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
    (
      SELECT 
        json_agg(json_build_object(
          'produto_consequentemente_comprado', subquery.produto_consequentemente_comprado,
          'confianca', subquery.confianca,
          'lift', subquery.lift
        )) AS recomendacoes
      FROM (
        SELECT DISTINCT ON (produto_consequentemente_comprado)
          produto_consequentemente_comprado,
          confianca,
          lift
        FROM recomendacoes
        WHERE produto_analisado = p.nome
        ORDER BY produto_consequentemente_comprado, confianca DESC
      ) AS subquery
    ) AS recomendacoes,
    CASE
      WHEN COUNT(*) FILTER(WHERE v.pagamento = 1) >= COUNT(*) FILTER(WHERE v.pagamento = 2) AND
           COUNT(*) FILTER(WHERE v.pagamento = 1) >= COUNT(*) FILTER(WHERE v.pagamento = 3) AND
           COUNT(*) FILTER(WHERE v.pagamento = 1) >= COUNT(*) FILTER(WHERE v.pagamento = 4)
      THEN 'débito'
      WHEN COUNT(*) FILTER(WHERE v.pagamento = 2) >= COUNT(*) FILTER(WHERE v.pagamento = 1) AND
           COUNT(*) FILTER(WHERE v.pagamento = 2) >= COUNT(*) FILTER(WHERE v.pagamento = 3) AND
           COUNT(*) FILTER(WHERE v.pagamento = 2) >= COUNT(*) FILTER(WHERE v.pagamento = 4)
      THEN 'boleto'
      WHEN COUNT(*) FILTER(WHERE v.pagamento = 3) >= COUNT(*) FILTER(WHERE v.pagamento = 1) AND
           COUNT(*) FILTER(WHERE v.pagamento = 3) >= COUNT(*) FILTER(WHERE v.pagamento = 2) AND
           COUNT(*) FILTER(WHERE v.pagamento = 3) >= COUNT(*) FILTER(WHERE v.pagamento = 4)
      THEN 'pix'
      WHEN COUNT(*) FILTER(WHERE v.pagamento = 4) >= COUNT(*) FILTER(WHERE v.pagamento = 1) AND
           COUNT(*) FILTER(WHERE v.pagamento = 4) >= COUNT(*) FILTER(WHERE v.pagamento = 2) AND
           COUNT(*) FILTER(WHERE v.pagamento = 4) >= COUNT(*) FILTER(WHERE v.pagamento = 3)
      THEN 'credito'
      ELSE 'null'
    END AS metodo_principal_pagamento
FROM
    produtos p
LEFT JOIN
    vendas v ON p.id = v.id_produto
WHERE
    p.id = ${id}
GROUP BY
    p.id, p.nome, p.categoria, p.preco
ORDER BY
    p.id;

    `);
  } catch (err) {
    console.error(err);
  }
}


}

export default new ProductRepository();
