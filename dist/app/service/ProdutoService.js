"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProdutoRepository_1 = __importDefault(require("../repository/ProdutoRepository"));
class ProdutoService {
    static async getAllUsers() {
        return await ProdutoRepository_1.default.getAllProducts();
    }
}
exports.default = ProdutoService;
