import { Config } from "../config";
import { IUserDTO } from "../types/dto/user.dto";

const jwt = require("jsonwebtoken");

export class TokenService {
  static createAuthToken(dto: IUserDTO): string {
    return jwt.sign(dto, Config.app.JWT_SECRET_KEY, {
      expiresIn: `${Config.app.TOKEN_EXPIRES_HOURS}h`,
    });
  }

  static decodeAuthToken(token: string): IUserDTO {
    return jwt.verify(token, Config.app.JWT_SECRET_KEY);
  }
}
