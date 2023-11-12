import { Router } from "express";
import ClientController from "../../controller/ClientController";

const clientRouter = Router();

clientRouter

.get("/vendas", ClientController.listClientPurchases)
.get("/segmentacao", ClientController.listClientPurchases)


export default clientRouter;
