import { ICreateImageDTO, ImageDTO } from "./dto/image.dto";

export interface ImageModel extends ImageDTO {}

export interface ImageService {
    createImage(dto: ICreateImageDTO, auctionId: string, userId: string): Promise<ImageModel>;
    uploadImages(imageDTOs: ICreateImageDTO[], auctionId: string, userId: string): Promise<ImageModel[]>;
    deleteImage(imageId: string): Promise<boolean>;
    
    getImageById(id: string): Promise<ImageModel>;
    getAuctionImages(auctionId: string): Promise<ImageModel[]>;
}

export interface IValidatedImages {
    toCreate: ICreateImageDTO[];
    toDelete: ImageModel[];
}
