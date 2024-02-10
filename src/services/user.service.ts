import { ILoginDTO, IRegistrationDTO, IUserDTO } from "../types/dto/user.dto";
import { IUserModel, IUserService } from "../types/user.type";
import bcrypt from "bcryptjs";
import { Prisma } from "../database/prisma-instance";
import { Config } from "../config";

const jwt = require("jsonwebtoken"); // TODO :: use imports, not require!

class UserServiceImpl implements IUserService {
  async getUserByLogin(login: string): Promise<IUserModel> {
    return Prisma.instance.user.findUnique({
      where: { login: login },
    });
  }

  async createUser(dto: IRegistrationDTO): Promise<IUserModel> {
    return Prisma.instance.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      }
    });
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async checkPasswordHash(dto: ILoginDTO): Promise<boolean> {
    return await bcrypt.compare(dto.password, dto.password);
  }

  createToken(dto: IUserDTO): string {
    return jwt.sign({ userId: dto.id }, Config.app.JWT_SECRET_KEY, {
      expiresIn: "5h", // TODO :: use environment variable
    });
  }
}

export function userServiceFactory(): IUserService {
  return new UserServiceImpl();
}
