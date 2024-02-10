import { ICreateImageDTO, ImageDTO } from "./dto/image.dto";

export interface ImageModel extends ImageDTO {}

export interface ImageService {
    createImage(dto: ICreateImageDTO, auctionId: string): Promise<ImageModel>;
    deleteImage(imageId: string): Promise<boolean>;
}
