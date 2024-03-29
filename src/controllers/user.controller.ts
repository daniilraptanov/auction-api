import { Request, Response } from "express";
import { IUserModel } from "../types/user.type";
import { ILoginDTO, IRegistrationDTO } from "../types/dto/user.dto";
import { sendResponse } from "../handlers/response.handler";
import { userServiceFactory } from "../services/user.service";
import { UserMapperImpl } from "../mappers/user.mapper";
import { StatusCodes } from "http-status-codes";
import { logger } from "../handlers/logging.handler";
import { CryptoService } from "../services/crypto.service";
import { TokenService } from "../services/token.service";
import { ApiRequest } from "../handlers/request.handler";


export class UserController {
  @logger
  static async registration(req: Request, res: Response) {
      const userService = userServiceFactory();
      const userMapper = new UserMapperImpl();

      const data: IRegistrationDTO = ApiRequest.getValidatedParams(req);

      if (await userService.getUserByLogin(data.login)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, "This login is used.");
      }

      const user: IUserModel = await userService.createUser({
        ...data,
        password: await CryptoService.hashedPassword(data.password),
      });

      if (!user) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "User does not created.");
      };

      const token = TokenService.createAuthToken(user);
  
      if (!token) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Token does not created!");
      }

      sendResponse(res, StatusCodes.CREATED, "User was created.", userMapper.toAuthDTO(user, token));
  }

  @logger
  static async login(req: Request, res: Response) {
      const userService = userServiceFactory();
      const userMapper = new UserMapperImpl();

      const data: ILoginDTO = ApiRequest.getValidatedParams(req);
      
      const user: IUserModel = await userService.getUserByLogin(data.login);

      if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "User does not exist.");
      }
      
      if (!await CryptoService.checkPasswordHash(data.password, user.password)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, "Password is wrong!");
      }

      const token = TokenService.createAuthToken(user);
  
      if (!token) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Token does not created!");
      }
  
      sendResponse(res, StatusCodes.OK, "User was login!", userMapper.toAuthDTO(user, token));
  }
}

