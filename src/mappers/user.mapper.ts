import { IUserDTO } from "../types/dto/user.dto";
import { IUserModel } from "../types/user.type";
import { SimpleMapper } from "./simple.mapper";

export class UserMapperImpl extends SimpleMapper<IUserModel, IUserDTO> {
    protected _fromDTOFields: string[] = [];
    protected _toDTOFields: string[] = ["id", "login", "createdAt", "updatedAt"];

    fromDTO(_dto: IUserDTO): IUserModel {
        throw new Error("User should be create via IRegistrationDTO");
    }
}

