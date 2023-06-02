"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("../database/index"));
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
process.on('SIGINT', async () => {
    await index_1.default.$disconnect();
    console.log('Conexão com o banco de dados encerrada.');
    process.exit(0);
});
