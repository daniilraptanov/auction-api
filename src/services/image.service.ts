import { MAX_AUCTION_IMAGES } from "../constants";
import { ICreateImageDTO, ImageDTO } from "../types/dto/image.dto";
import { ImageModel, ImageService, IValidatedImages } from "../types/image.type";
import { SimpleService } from "./simple.service";

class ImageServiceImpl extends SimpleService implements ImageService {
    private getValidatedImages(imageDTOs: ICreateImageDTO[], existingImages: ImageModel[]): IValidatedImages {
        const toCreate = imageDTOs.filter(dto => !dto.id);
        if ((toCreate.length + existingImages.length) > MAX_AUCTION_IMAGES) {
            throw new Error("Images limit exceeded.");
        }

        return {
            toCreate,
            toDelete: existingImages.filter(model => !Boolean(imageDTOs.find(dto => model.id === dto.id)))
        }
    }
    
    async createImage(dto: ICreateImageDTO, auctionId: string, userId: string): Promise<ImageModel> {
        return this._dbInstance.image.create({
            data: {
              source: dto.source,
              auctionId,
              userId
            }
        });
    }

    async uploadImages(imageDTOs: ICreateImageDTO[], auctionId: string, userId: string): Promise<ImageModel[]> {
        const auctionImages = await this.getAuctionImages(auctionId);
        const validatedImages = this.getValidatedImages(imageDTOs, auctionImages);
            
        const deleted = await Promise.all(validatedImages.toDelete.map(image => this.deleteImage(image.id)));
        if (deleted.some(status => !status)) {
            throw new Error("Image was not deleted.");
        }

        const created = await Promise.all(validatedImages.toCreate.map(dto => this.createImage(dto, auctionId, userId)));
        if (created.some(image => !image.id)) {
            throw new Error("Image was not created.");
        }

        return created;
    }

    async deleteImage(imageId: string): Promise<boolean> {
        return !!(await this._dbInstance.image.delete({
            where: {
                id: imageId
            }
        })).id;
    }

    async getImageById(id: string): Promise<ImageModel> {
        return this._dbInstance.image.findFirst({ where: { id } });
    }

    getAuctionImages(auctionId: string): Promise<ImageModel[]> {
        return this._dbInstance.image.findMany({ where: { auctionId } });
    }
}

export function imageServiceFactory(dbInstance = null): ImageService {
  return new ImageServiceImpl(dbInstance);
}
