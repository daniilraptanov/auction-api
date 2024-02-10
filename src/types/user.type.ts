import { ILoginDTO, IRegistrationDTO, IUserDTO } from "./dto/user.dto";

export interface IUserModel extends ILoginDTO, IUserDTO {}

export interface IUserMapper {
  toAuthDTO(model: IUserModel, token: string): IUserDTO;
}

export interface IUserService {
  createUser(dto: IRegistrationDTO): Promise<IUserModel>;
  getUserByLogin(login: string): Promise<IUserModel>;
}

