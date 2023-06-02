"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Validators {
    validateCPF(cpf) {
        const cleanedCPF = cpf.replace(/\D/g, "");
        if (cleanedCPF.length !== 11) {
            return false;
        }
        if (/^(\d)\1+$/.test(cleanedCPF)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
        }
        let mod = sum % 11;
        const digit1 = mod < 2 ? 0 : 11 - mod;
        if (parseInt(cleanedCPF.charAt(9)) !== digit1) {
            return false;
        }
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
        }
        mod = sum % 11;
        const digit2 = mod < 2 ? 0 : 11 - mod;
        if (parseInt(cleanedCPF.charAt(10)) !== digit2) {
            return false;
        }
        return true;
    }
    async encryptPassword(password) {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (error) {
            throw new Error("Erro ao criptografar senha");
        }
    }
}
exports.default = new Validators();
