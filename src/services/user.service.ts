import { IRegistrationDTO, IUserDTO } from "../types/dto/user.dto";
import { IUserModel, IUserService } from "../types/user.type";
import { SimpleService } from "./simple.service";

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
}

export function userServiceFactory(dbInstance = null): IUserService {
  return new UserServiceImpl(dbInstance);
}
