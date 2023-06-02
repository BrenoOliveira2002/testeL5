import { Request, Response, NextFunction } from "express";
import Validators from "../utils/Validators";
import UserCreateDTO from "../types/user/userCreateDTO";
import UserService from "../app/service/UserService";

class UserValidator {
  async validateUserCreation(req: Request, res: Response, next: NextFunction) {
    const { nome, cpf, email, phone, password } = req.body as UserCreateDTO;

    if (
      typeof nome !== "string" ||
      typeof cpf !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser strings." });
    }

    if (!Validators.validateCPF(cpf)) {
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
      // Verificar se o email já está sendo utilizado
      const existingEmail = await UserService.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email já cadastrado." });
      }

      // Verificar se o telefone já está sendo utilizado
      const existingPhone = await UserService.getUserByPhone(phone);
      if (existingPhone) {
        return res.status(400).json({ error: "Telefone já cadastrado." });
      }

      // Verificar se o CPF já está sendo utilizado
      const existingCPF = await UserService.getUserByCPF(cpf);
      if (existingCPF) {
        return res.status(400).json({ error: "CPF já cadastrado." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao validar o usuário." });
    }
  }

  async validateUserUpdate(req: Request, res: Response, next: NextFunction) {
    const { id, nome, cpf, email, phone } = req.body;

    if (
      nome &&
      (typeof nome !== "string" || nome.length < 3 || nome.length > 30)
    ) {
      return res
        .status(400)
        .json({ error: "O nome deve ter entre 3 e 30 caracteres." });
    }

    if (cpf && (typeof cpf !== "string" || !Validators.validateCPF(cpf))) {
      return res.status(400).json({ error: "CPF inválido." });
    }

    if (phone && (typeof phone !== "string" || phone.length !== 11)) {
      return res.status(400).json({ error: "O telefone deve ter 11 dígitos." });
    }

    if (email && (typeof email !== "string" || !email.includes("@"))) {
      return res.status(400).json({ error: "O email deve ser válido." });
    }

    try {
      // Verificar se o email já está sendo utilizado
      if (email) {
        const existingEmail = await UserService.getUserByEmail(email);
        if (existingEmail && existingEmail.id !== id) {
          return res.status(400).json({ error: "Email já cadastrado." });
        }
      }

      // Verificar se o telefone já está sendo utilizado
      if (phone) {
        const existingPhone = await UserService.getUserByPhone(phone);
        if (existingPhone && existingPhone.id !== id) {
          return res.status(400).json({ error: "Telefone já cadastrado." });
        }
      }

      // Verificar se o CPF já está sendo utilizado
      if (cpf) {
        const existingCPF = await UserService.getUserByCPF(cpf);
        if (existingCPF && existingCPF.id !== id) {
          return res.status(400).json({ error: "CPF já cadastrado." });
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao validar o usuário." });
    }
  }

  validateID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "ID inválido." });
    }

    next();
  }

  validateMediaUser(req: Request, res: Response, next: NextFunction) {
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

export default new UserValidator();
