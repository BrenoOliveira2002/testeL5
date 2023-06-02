import { Request, Response } from "express";
import UserService from "../service/UserService";
import UserCreateDTO from "../../types/user/userCreateDTO";
import UserDTO from "../../types/user/userDTO";
import Validators from "../../utils/Validators";
import S3 from "../../utils/S3";
import MediaDTO from "../../types/media/mediaDTO";

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const { nome, cpf, email, phone } = req.query;
      const userDTO: UserDTO = {
        nome: nome?.toString() || "",
        cpf: cpf?.toString() || "",
        email: email?.toString() || "",
        phone: phone?.toString() || "",
      };

      const users = await UserService.getAllUsers(userDTO);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar os usuários." });
    }
  }

  public async createUser(req: Request, res: Response) {
    const userCreateDTO: UserCreateDTO = req.body;

    try {
      const hashedPassword = await Validators.encryptPassword(
        userCreateDTO.password
      );
      const user = await UserService.createUser({
        ...userCreateDTO,
        password: hashedPassword,
      });
      userCreateDTO.password = hashedPassword;
      res.status(201).json(userCreateDTO);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar o usuário." });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;
    try {
      const existingUser: UserDTO | null = await UserService.findById(
        Number(id)
      );
      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const user = await UserService.updateUser(Number(id), userData);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const existingUser: UserDTO | null = await UserService.findById(
        Number(id)
      );
      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await UserService.deleteUser(Number(id));
      res.json({ message: "Usuário removido com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover o usuário." });
    }
  }

  public async uploadFile(req: Request, res: Response) {
    const { id, type, file } = req.body;

    try {
      const existingUser = await UserService.findById(Number(id));

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const fileName = `${id}_.${type}`;
      const fileBuffer = Buffer.from(file, "base64");

      const fileUrl = await S3.uploadFile(fileName, fileBuffer, type);

      const mediaDTO: MediaDTO = {
        urlMidia: fileUrl,
        type: type,
        userId: id,
      };

      const createdMedia = await UserService.saveFile(mediaDTO);

      res.json({
        message: "Arquivo enviado com sucesso.",
        fileUrl,
        media: createdMedia,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Erro ao enviar o arquivo." });
    }
  }

  public async getMediaByID(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const media = await UserService.getMediaByID(Number(id));

      if (!media) {
        return res.status(404).json({ error: "Mídia não encontrada." });
      }

      res.json(media);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar a mídia." });
    }
  }
}

export default new UserController();
