import { Media, PrismaClient, User } from "@prisma/client";
import UserDTO from "../../types/user/userDTO";
import UserCreateDTO from "../../types/user/userCreateDTO";
import MediaDTO from "../../types/media/mediaDTO";

const prisma = new PrismaClient();

class UserRepository {
  public async getAllUsers(userDTO: UserDTO) {
    const { nome, cpf, email, phone } = userDTO;

    if (nome) {
      return prisma.user.findMany({
        where: {
          nome: { contains: nome },
        },
      });
    } else if (cpf) {
      return prisma.user.findUnique({
        where: {
          cpf,
        },
      });
    } else if (email) {
      return prisma.user.findUnique({
        where: {
          email,
        },
      });
    } else if (phone) {
      return prisma.user.findUnique({
        where: {
          phone,
        },
      });
    }

    return prisma.user.findMany();
  }

  public async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  public async createUser(userData: UserCreateDTO): Promise<UserDTO> {
    const { nome, cpf, email, phone, password } = userData;
    return prisma.user.create({
      data: { nome, cpf, email, phone, password },
    });
  }

  public async updateUser(
    id: number,
    userData: UserCreateDTO
  ): Promise<UserDTO | null> {
    const { nome, cpf, email, phone, password } = userData;
    return prisma.user.update({
      where: { id },
      data: { nome, cpf, email, phone, password },
    });
  }
  public async getUserByPhone(phone: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { phone } });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  public async getUserByCPF(cpf: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { cpf } });
  }

  public async deleteUser(id: number): Promise<UserDTO | null> {
    return prisma.user.delete({ where: { id } });
  }

  async saveFileData(mediaDTO: MediaDTO): Promise<void> {
    await prisma.media.create({
      data: {
        url_midia : mediaDTO.urlMidia,
        type: mediaDTO.type,
        userId: mediaDTO.userId
      },
    });
  }

  public async getMediaByID(id: number): Promise<Media | null> {
    return prisma.media.findUnique({
      where: { id },
    });
  }
}

export default new UserRepository();
