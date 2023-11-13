import { Router } from "express";
import ClientController from "../../controller/ClientController";

const   clientRouter = Router();

clientRouter

.get("/segmentacao", ClientController.listClientPurchases)


export default clientRouter;
