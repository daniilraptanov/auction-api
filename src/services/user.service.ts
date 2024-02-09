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

  async createUser(user: IRegistrationDTO): Promise<IUserModel> {
    return Prisma.instance.user.create({
      data: {
        login: user.login,
        password: user.password,
      }
    });
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async checkPasswordHash(user: ILoginDTO): Promise<boolean> {
    return await bcrypt.compare(user.password, user.password);
  }

  createToken(user: IUserDTO): string {
    return jwt.sign({ userId: user.id }, Config.app.JWT_SECRET_KEY, {
      expiresIn: "5h", // TODO :: use environment variable
    });
  }
}

export function userServiceFactory(): IUserService {
  return new UserServiceImpl();
}
