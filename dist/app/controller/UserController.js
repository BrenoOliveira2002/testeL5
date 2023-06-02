"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const Validators_1 = __importDefault(require("../../utils/Validators"));
const S3_1 = __importDefault(require("../../utils/S3"));
class UserController {
    async getAllUsers(req, res) {
        try {
            const { nome, cpf, email, phone } = req.query;
            const userDTO = {
                nome: (nome === null || nome === void 0 ? void 0 : nome.toString()) || "",
                cpf: (cpf === null || cpf === void 0 ? void 0 : cpf.toString()) || "",
                email: (email === null || email === void 0 ? void 0 : email.toString()) || "",
                phone: (phone === null || phone === void 0 ? void 0 : phone.toString()) || "",
            };
            const users = await UserService_1.default.getAllUsers(userDTO);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar os usuários." });
        }
    }
    async createUser(req, res) {
        const userCreateDTO = req.body;
        try {
            const hashedPassword = await Validators_1.default.encryptPassword(userCreateDTO.password);
            const user = await UserService_1.default.createUser({
                ...userCreateDTO,
                password: hashedPassword,
            });
            userCreateDTO.password = hashedPassword;
            res.status(201).json(userCreateDTO);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao criar o usuário." });
        }
    }
    async updateUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
        try {
            const existingUser = await UserService_1.default.findById(Number(id));
            if (!existingUser) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            const user = await UserService_1.default.updateUser(Number(id), userData);
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao atualizar o usuário." });
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const existingUser = await UserService_1.default.findById(Number(id));
            if (!existingUser) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            await UserService_1.default.deleteUser(Number(id));
            res.json({ message: "Usuário removido com sucesso." });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao remover o usuário." });
        }
    }
    async uploadFile(req, res) {
        const { id, type, file } = req.body;
        try {
            const existingUser = await UserService_1.default.findById(Number(id));
            if (!existingUser) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            const fileName = `${id}_.${type}`;
            const fileBuffer = Buffer.from(file, "base64");
            const fileUrl = await S3_1.default.uploadFile(fileName, fileBuffer, type);
            const mediaDTO = {
                urlMidia: fileUrl,
                type: type,
                userId: id,
            };
            const createdMedia = await UserService_1.default.saveFile(mediaDTO);
            res.json({
                message: "Arquivo enviado com sucesso.",
                fileUrl,
                media: createdMedia,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao enviar o arquivo." });
        }
    }
    async getMediaByID(req, res) {
        const { id } = req.params;
        try {
            const media = await UserService_1.default.getMediaByID(Number(id));
            if (!media) {
                return res.status(404).json({ error: "Mídia não encontrada." });
            }
            res.json(media);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar a mídia." });
        }
    }
}
exports.default = new UserController();
