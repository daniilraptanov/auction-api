import { IAuctionModel } from "../types/auction.type";
import { IAuctionDTO } from "../types/dto/auction.dto";
import { ImageMapperImpl } from "./image.mapper";
import { RateMapperImpl } from "./rate.mapper";
import { SimpleMapper } from "./simple.mapper";

export class AuctionMapperImpl extends SimpleMapper<IAuctionModel, IAuctionDTO> {
    private _commonDTOFields = ["description", "status"];
    
    protected _fromDTOFields: string[] = [...this._commonDTOFields, "initialRate"];
    protected _toDTOFields: string[] = [
        ...this._commonDTOFields,
        "id",
        "userId",
        "createdAt",
        "updatedAt"
    ];

    toDTO(model: IAuctionModel): IAuctionDTO {
        const rateMapper = new RateMapperImpl();
        const imageMapper = new ImageMapperImpl();
        
        const dto = super.toDTO(model);
        dto.lastRate = rateMapper.toDTO(model.lastRate);
        dto.images = model.images.map(image => imageMapper.toDTO(image));
        dto.rates = model.rates.map(rate => rateMapper.toDTO(rate));

        return dto;
    }
}

