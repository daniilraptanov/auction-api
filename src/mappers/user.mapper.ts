import { IUserDTO } from "../types/dto/user.dto";
import { IUserMapper, IUserModel } from "../types/user.type";
import { SimpleMapper } from "./simple.mapper";

export class UserMapperImpl extends SimpleMapper<IUserModel, IUserDTO> implements IUserMapper {
    protected _toDTOFields: string[] = ["id", "login", "createdAt", "updatedAt"];

    toAuthDTO(model: IUserModel, token: string): IUserDTO {
        const dto = super.toDTO(model);
        if (token) dto.token = token;
        return dto;
    }
}

