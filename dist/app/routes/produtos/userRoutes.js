"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProdutoController_1 = __importDefault(require("../../controller/ProdutoController"));
const produtosRouter = (0, express_1.Router)();
produtosRouter
    .get("/produtos", ProdutoController_1.default.GetAllProducts);
exports.default = produtosRouter;
