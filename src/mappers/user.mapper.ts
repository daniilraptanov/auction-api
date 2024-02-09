import { IUserDTO } from "../types/dto/user.dto";
import { IMapper } from "../types/tools/mapper.type";
import { IUserModel } from "../types/user.type";


// TODO :: use arrays with names of fields for mapping
export class UserMapperImpl implements IMapper<IUserModel, IUserDTO> {
    toDTO(model: IUserModel): IUserDTO {
        return {
            id: model.id,
            login: model.login,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        }
    }

    fromDTO(_dto: IUserDTO): IUserModel {
        throw new Error("User should be create via IRegistrationDTO");
    }
}

