import { ImageDTO } from "../types/dto/image.dto";
import { ImageModel } from "../types/image.type";
import { SimpleMapper } from "./simple.mapper";

export class ImageMapperImpl extends SimpleMapper<ImageModel, ImageDTO> {    
    protected _fromDTOFields: string[] = ["source"];
    protected _toDTOFields: string[] = [
        ...this._fromDTOFields,
        "id",
        "auctionId",
        "createdAt",
        "updatedAt"
    ];
}
