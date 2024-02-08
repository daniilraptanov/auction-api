import { ILoginDTO, IRegistrationDTO, IUserDTO } from "./dto/user.dto";

export interface IUserModel extends ILoginDTO, IUserDTO {}

export interface IUserService {
  createUser(user: IRegistrationDTO): Promise<IUserModel>;
  getUserByLogin(login: string): Promise<IUserModel>;

  checkPasswordHash(user: IUserModel): Promise<boolean>; // TODO :: replace to CryptoService
  hashedPassword(password: string): Promise<string>; // TODO :: replace to CryptoService

  createToken(user: IUserDTO): string; // TODO :: replace to TokenService
}

