import { ILoginDTO, IRegistrationDTO, IUserDTO } from "../types/dto/user.dto";
import { IUserModel, IUserService } from "../types/user.type";
import bcrypt from "bcryptjs";
import { Config } from "../config";
import { SimpleService } from "./simple.service";

const jwt = require("jsonwebtoken"); // TODO :: use imports, not require!

class UserServiceImpl extends SimpleService implements IUserService {
  async getUserByLogin(login: string): Promise<IUserModel> {
    return this._dbInstance.user.findUnique({
      where: { login: login },
    });
  }

  async createUser(dto: IRegistrationDTO): Promise<IUserModel> {
    return this._dbInstance.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      }
    });
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  createToken(dto: IUserDTO): string {
    return jwt.sign(dto, Config.app.JWT_SECRET_KEY, {
      expiresIn: "5h", // TODO :: use environment variable
    });
  }
}

export function userServiceFactory(dbInstance = null): IUserService {
  return new UserServiceImpl(dbInstance);
}
