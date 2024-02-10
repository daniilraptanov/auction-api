import { IUserDTO } from "../types/dto/user.dto";
import { IUserModel } from "../types/user.type";
import { SimpleMapper } from "./simple.mapper";

export class UserMapperImpl extends SimpleMapper<IUserModel, IUserDTO> {
    protected _toDTOFields: string[] = ["id", "login", "createdAt", "updatedAt"];
}

