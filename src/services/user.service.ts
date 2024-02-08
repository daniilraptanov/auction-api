import { ILoginDTO, IRegistrationDTO, IUserDTO } from "../types/dto/user.dto";
import { IUserModel, IUserService } from "../types/user.type";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

const jwt = require("jsonwebtoken"); // TODO :: use imports, not require!

class UserServiceImpl implements IUserService {
  async getUserByLogin(login: string): Promise<IUserModel> {
    return await User.findOne({
      where: { login: login },
    });
  }

  async createUser(user: IRegistrationDTO): Promise<IUserModel> {
    return await User.create({
      login: user.login,
      password: user.password,
    });
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async checkPasswordHash(user: ILoginDTO): Promise<boolean> {
    return await bcrypt.compare(user.password, user.password);
  }

  createToken(user: IUserDTO): string {
    return jwt.sign({ userId: user.id }, config.jwtSecretKey, {
      expiresIn: "5h",
    });
  }
}

export function userServiceFactory(): IUserService {
  return new UserServiceImpl();
}
