import { ICreateImageDTO, ImageDTO } from "./dto/image.dto";

export interface ImageModel extends ImageDTO {}

export interface ImageService {
    createImage(dto: ICreateImageDTO): Promise<ImageModel>;
    deleteImage(imageId: string): Promise<boolean>;
}
