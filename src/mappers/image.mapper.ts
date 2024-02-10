import { ImageDTO } from "../types/dto/image.dto";
import { ImageModel } from "../types/image.type";
import { SimpleMapper } from "./simple.mapper";

export class ImageMapperImpl extends SimpleMapper<ImageModel, ImageDTO> {
    protected _toDTOFields: string[] = [
        "id",
        "source",
        "auctionId",
        "createdAt",
        "updatedAt"
    ];
}
