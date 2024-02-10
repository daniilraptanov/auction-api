import { IMapper } from "../types/tools/mapper.type";

export abstract class SimpleMapper<Model, DTO> implements IMapper<Model, DTO> {
    protected _fromDTOFields: string[] = [];
    protected _toDTOFields: string[] = [];
    
    fromDTO(dto: DTO): Model {
        return this._fromDTOFields.reduce((model: Model, field: string) => {
            model[field] = dto[field];
            return model;
        }, {} as Model);
    }

    toDTO(model: Model): DTO {
        return this._toDTOFields.reduce((dto: DTO, field: string) => {
            dto[field] = model[field];
            return dto;
        }, {} as DTO);
    }
}