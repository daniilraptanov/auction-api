import { ICreateImageDTO } from "../types/dto/image.dto";
import { ImageModel, ImageService } from "../types/image.type";
import { SimpleService } from "./simple.service";

class ImageServiceImpl extends SimpleService implements ImageService {
    async createImage(dto: ICreateImageDTO, auctionId: string, userId: string): Promise<ImageModel> {
        return this._dbInstance.image.create({
            data: {
              source: dto.source,
              auctionId,
              userId
            }
        });
    }

    async deleteImage(imageId: string): Promise<boolean> {
        return !!(await this._dbInstance.image.delete({
            where: {
                id: imageId
            }
        })).id;
    }
}

export function imageServiceFactory(dbInstance = null): ImageService {
  return new ImageServiceImpl(dbInstance);
}
