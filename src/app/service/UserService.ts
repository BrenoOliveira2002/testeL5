import UserRepository from "../repository/UserRepository";
import UserCreateDTO from "../../types/user/userCreateDTO";
import UserDTO from "../../types/user/userDTO";
import MediaDTO from "../../types/media/mediaDTO";
import { Media } from "@prisma/client";

class UserService {
  static async getAllUsers(queryParams: UserDTO) {
    return await UserRepository.getAllUsers(queryParams);
  }

  static async findById(id: number): Promise<UserDTO | null> {
    return UserRepository.getUserById(id);
  }

  static async createUser(userData: UserCreateDTO) {
    return UserRepository.createUser(userData);
  }

  static async updateUser(id: number, userData: UserCreateDTO) {
    return UserRepository.updateUser(id, userData);
  }

  static async deleteUser(id: number) {
    return UserRepository.deleteUser(id);
  }

  static async getUserByPhone(phone: string): Promise<UserDTO | null> {
    return  await UserRepository.getUserByPhone(phone);
  }

  static async getUserByEmail(email: string): Promise<UserDTO | null> {
    return await UserRepository.getUserByEmail(email);
  }

  static async getUserByCPF(cpf: string): Promise<UserDTO | null> {
    return await UserRepository.getUserByCPF(cpf);
  }

  static async saveFile(mediaDTO: MediaDTO): Promise<void> {
    await UserRepository.saveFileData(mediaDTO);
  }

  static async getMediaByID(id: number): Promise<Media | null> {
    return UserRepository.getMediaByID(id);
  }
}

export default UserService;
