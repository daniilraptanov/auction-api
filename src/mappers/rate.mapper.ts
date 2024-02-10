import { IRateDTO } from "../types/dto/rate.dto";
import { IRateModel } from "../types/rate.type";
import { SimpleMapper } from "./simple.mapper";

export class RateMapperImpl extends SimpleMapper<IRateModel, IRateDTO> {
    protected _toDTOFields: string[] = [
        "id",
        "rate",
        "userId",
        "auctionId",
        "createdAt",
        "updatedAt"
    ];
}

