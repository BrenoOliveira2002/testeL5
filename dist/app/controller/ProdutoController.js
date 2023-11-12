"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProdutoService_1 = __importDefault(require("../service/ProdutoService"));
class ProdutoController {
    async GetAllProducts(req, res) {
        try {
            const { nome, cpf, email, phone } = req.query;
            // const produtoDTO: produtoInterface = {
            //   nome: nome?.toString() || "",
            //   cpf: cpf?.toString() || "",
            //   email: email?.toString() || "",
            //   phone: phone?.toString() || "",
            // };
            const products = await ProdutoService_1.default.getAllUsers();
            res.json(products);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao buscar os usuários." });
        }
    }
}
exports.default = new ProdutoController();
