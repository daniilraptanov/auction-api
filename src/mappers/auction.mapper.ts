import { IAuctionModel } from "../types/auction.type";
import { IAuctionDTO } from "../types/dto/auction.dto";
import { ImageMapperImpl } from "./image.mapper";
import { RateMapperImpl } from "./rate.mapper";
import { SimpleMapper } from "./simple.mapper";

export class AuctionMapperImpl extends SimpleMapper<IAuctionModel, IAuctionDTO> {
    private _commonDTOFields = ["description", "status"];
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
        dto.lastRate = model.lastRate ? rateMapper.toDTO(model.lastRate) : null;
        dto.mainImage = model.mainImage ? imageMapper.toDTO(model.mainImage) : null;
        dto.images = model.images?.length ? model.images.map(image => imageMapper.toDTO(image)) : [];
        dto.rates = model.rates?.length ? model.rates.map(rate => rateMapper.toDTO(rate)) : [];

        return dto;
    }
}

