"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async getAllUsers(userDTO) {
        const { nome, cpf, email, phone } = userDTO;
        if (nome) {
            return prisma.user.findMany({
                where: {
                    nome: { contains: nome },
                },
            });
        }
        else if (cpf) {
            return prisma.user.findUnique({
                where: {
                    cpf,
                },
            });
        }
        else if (email) {
            return prisma.user.findUnique({
                where: {
                    email,
                },
            });
        }
        else if (phone) {
            return prisma.user.findUnique({
                where: {
                    phone,
                },
            });
        }
        return prisma.user.findMany();
    }
    async getUserById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    async createUser(userData) {
        const { nome, cpf, email, phone, password } = userData;
        return prisma.user.create({
            data: { nome, cpf, email, phone, password },
        });
    }
    async updateUser(id, userData) {
        const { nome, cpf, email, phone, password } = userData;
        return prisma.user.update({
            where: { id },
            data: { nome, cpf, email, phone, password },
        });
    }
    async getUserByPhone(phone) {
        return prisma.user.findUnique({ where: { phone } });
    }
    async getUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async getUserByCPF(cpf) {
        return prisma.user.findUnique({ where: { cpf } });
    }
    async deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    }
    async saveFileData(mediaDTO) {
        await prisma.media.create({
            data: {
                url_midia: mediaDTO.urlMidia,
                type: mediaDTO.type,
                userId: mediaDTO.userId
            },
        });
    }
    async getMediaByID(id) {
        return prisma.media.findUnique({
            where: { id },
        });
    }
}
exports.default = new UserRepository();
