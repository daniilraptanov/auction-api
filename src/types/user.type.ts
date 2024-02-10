import { ILoginDTO, IRegistrationDTO, IUserDTO } from "./dto/user.dto";

export interface IUserModel extends ILoginDTO, IUserDTO {}

export interface IUserService {
  createUser(dto: IRegistrationDTO): Promise<IUserModel>;
  getUserByLogin(login: string): Promise<IUserModel>;

  checkPasswordHash(password: string, hash: string): Promise<boolean>; // TODO :: replace to CryptoService
  hashedPassword(password: string): Promise<string>; // TODO :: replace to CryptoService

  createToken(dto: IUserDTO): string; // TODO :: replace to TokenService
}

