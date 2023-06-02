"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class GithubApiController {
    async getUser(req, res) {
        try {
            const username = req.params.username;
            const apiUrl = `https://api.github.com/users/${username}`;
            const user = await axios_1.default.get(apiUrl);
            const data = user.data;
            const { login, name, email } = data;
            res.json({ login, name, email });
        }
        catch (error) {
            console.error("Erro ao consultar a API do GitHub:", error);
            res.status(500).json({ error: "Erro ao consultar a API do GitHub" });
        }
    }
}
exports.default = new GithubApiController();
