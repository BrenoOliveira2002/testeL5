"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
class UserService {
    static async getAllUsers(queryParams) {
        return await UserRepository_1.default.getAllUsers(queryParams);
    }
    static async findById(id) {
        return UserRepository_1.default.getUserById(id);
    }
    static async createUser(userData) {
        return UserRepository_1.default.createUser(userData);
    }
    static async updateUser(id, userData) {
        return UserRepository_1.default.updateUser(id, userData);
    }
    static async deleteUser(id) {
        return UserRepository_1.default.deleteUser(id);
    }
    static async getUserByPhone(phone) {
        return await UserRepository_1.default.getUserByPhone(phone);
    }
    static async getUserByEmail(email) {
        return await UserRepository_1.default.getUserByEmail(email);
    }
    static async getUserByCPF(cpf) {
        return await UserRepository_1.default.getUserByCPF(cpf);
    }
    static async saveFile(mediaDTO) {
        await UserRepository_1.default.saveFileData(mediaDTO);
    }
    static async getMediaByID(id) {
        return UserRepository_1.default.getMediaByID(id);
    }
}
exports.default = UserService;
