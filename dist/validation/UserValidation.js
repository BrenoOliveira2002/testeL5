"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validators_1 = __importDefault(require("../utils/Validators"));
const UserService_1 = __importDefault(require("../app/service/UserService"));
class UserValidator {
    async validateUserCreation(req, res, next) {
        const { nome, cpf, email, phone, password } = req.body;
        if (typeof nome !== "string" ||
            typeof cpf !== "string" ||
            typeof email !== "string" ||
            typeof phone !== "string" ||
            typeof password !== "string") {
            return res
                .status(400)
                .json({ error: "Todos os campos devem ser strings." });
        }
        if (!Validators_1.default.validateCPF(cpf)) {
            return res.status(400).json({ error: "CPF inválido." });
        }
        if (phone.length !== 11) {
            return res.status(400).json({ error: "O telefone deve ter 11 dígitos." });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ error: "O email deve ser válido." });
        }
        if (nome.length < 3 || nome.length > 30) {
            return res
                .status(400)
                .json({ error: "O nome deve ter entre 3 e 30 caracteres." });
        }
        try {
            const existingEmail = await UserService_1.default.getUserByEmail(email);
            if (existingEmail) {
                return res.status(400).json({ error: "Email já cadastrado." });
            }
            const existingPhone = await UserService_1.default.getUserByPhone(phone);
            if (existingPhone) {
                return res.status(400).json({ error: "Telefone já cadastrado." });
            }
            const existingCPF = await UserService_1.default.getUserByCPF(cpf);
            if (existingCPF) {
                return res.status(400).json({ error: "CPF já cadastrado." });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao validar o usuário." });
        }
    }
    async validateUserUpdate(req, res, next) {
        const { id, nome, cpf, email, phone } = req.body;
        if (nome &&
            (typeof nome !== "string" || nome.length < 3 || nome.length > 30)) {
            return res
                .status(400)
                .json({ error: "O nome deve ter entre 3 e 30 caracteres." });
        }
        if (cpf && (typeof cpf !== "string" || !Validators_1.default.validateCPF(cpf))) {
            return res.status(400).json({ error: "CPF inválido." });
        }
        if (phone && (typeof phone !== "string" || phone.length !== 11)) {
            return res.status(400).json({ error: "O telefone deve ter 11 dígitos." });
        }
        if (email && (typeof email !== "string" || !email.includes("@"))) {
            return res.status(400).json({ error: "O email deve ser válido." });
        }
        try {
            if (email) {
                const existingEmail = await UserService_1.default.getUserByEmail(email);
                if (existingEmail && existingEmail.id !== id) {
                    return res.status(400).json({ error: "Email já cadastrado." });
                }
            }
            if (phone) {
                const existingPhone = await UserService_1.default.getUserByPhone(phone);
                if (existingPhone && existingPhone.id !== id) {
                    return res.status(400).json({ error: "Telefone já cadastrado." });
                }
            }
            if (cpf) {
                const existingCPF = await UserService_1.default.getUserByCPF(cpf);
                if (existingCPF && existingCPF.id !== id) {
                    return res.status(400).json({ error: "CPF já cadastrado." });
                }
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao validar o usuário." });
        }
    }
    validateID(req, res, next) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "ID inválido." });
        }
        next();
    }
    validateMediaUser(req, res, next) {
        const { id, type, file } = req.body;
        if (!id) {
            return res.status(400).json({ error: "O campo id é obrigatório." });
        }
        if (!type) {
            return res.status(400).json({ error: "O campo type é obrigatório." });
        }
        if (!file) {
            return res.status(400).json({ error: "O campo file é obrigatório." });
        }
        const fileSizeKB = Buffer.byteLength(file, "base64") / 1024;
        const minFileSizeKB = 1;
        const maxFileSizeKB = 5000;
        if (fileSizeKB < minFileSizeKB) {
            return res
                .status(400)
                .json({ error: "O tamanho do arquivo deve ser maior que 1KB." });
        }
        if (fileSizeKB > maxFileSizeKB) {
            return res
                .status(400)
                .json({ error: "O tamanho do arquivo deve ser menor que 5MB." });
        }
        next();
    }
}
exports.default = new UserValidator();
