import { NextFunction, Request, Response } from "express";
import { IUserModel } from "../types/user.type";
import { ILoginDTO, IRegistrationDTO } from "../types/dto/user.dto";
import { sendResponse } from "../handlers/response.handler";
import { userServiceFactory } from "../services/user.service";
import { UserMapperImpl } from "../mappers/user.mapper";
import { StatusCodes } from "http-status-codes";
import { logger } from "../handlers/logging.handler";


export class UserController {
  @logger
  static async registration(req: Request, res: Response): Promise<any> {
      const userService = userServiceFactory();
      const userMapper = new UserMapperImpl();

      const data: IRegistrationDTO = req.body;

      if (data.password !== data.confirmPassword) { // TODO :: replace to service
        return sendResponse(res, StatusCodes.BAD_REQUEST, "Confirm-password is wrong");
      }

      if (await userService.getUserByLogin(data.login)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, "This login is used.");
      }

      const user: IUserModel = await userService.createUser({
        ...data,
        password: await userService.hashedPassword(data.password),
      });

      if (!user) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "User does not created.");
      };

      sendResponse(res, StatusCodes.CREATED, "User was created.", userMapper.toDTO(user));
  }

  @logger
  static async login(req: Request, res: Response): Promise<any> {
      const userService = userServiceFactory();
      const userMapper = new UserMapperImpl();

      const data: ILoginDTO = req.body;
      
      const user: IUserModel = await userService.getUserByLogin(data.login);

      if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "User does not exist.");
      }
      
      if (!await userService.checkPasswordHash(user)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, "Password is wrong!");
      }

      const token = userService.createToken(user);
  
      if (!token) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Token does not created!");
      }
  
      sendResponse(res, StatusCodes.OK, "User was login!", {token: token, user: userMapper.toDTO(user)});
  }
}

