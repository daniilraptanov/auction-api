import { IRateDTO } from "../types/dto/rate.dto";
import { IRateModel } from "../types/rate.type";
import { SimpleMapper } from "./simple.mapper";

export class RateMapperImpl extends SimpleMapper<IRateModel, IRateDTO> {    
    protected _fromDTOFields: string[] = ["rate"];
    protected _toDTOFields: string[] = [
        ...this._fromDTOFields,
        "id",
        "userId",
        "auctionId",
        "createdAt",
        "updatedAt"
    ];
}

