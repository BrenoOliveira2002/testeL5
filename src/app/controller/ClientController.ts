import { Request, Response } from "express";
import ClientService from "../service/ClientService";

class ClientController {

  public async listClientPurchases(req: Request, res: Response) {
    try {
     
      req.query.segmento = req.query.segmento?.toString() || ""
      const clientPurchases = await ClientService.listClientBySegment(req.query.segmento);
      res.json(clientPurchases)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar os compras do client." });
    }
  }
}

export default new ClientController();
