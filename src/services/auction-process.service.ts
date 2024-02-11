import { IAuctionModel, IAuctionProcessService } from "../types/auction.type";
import { ICreateAuctionDTO } from "../types/dto/auction.dto";
import { ICreateRateDTO } from "../types/dto/rate.dto";
import { IRateModel } from "../types/rate.type";
import { auctionServiceFactory } from "./auction.service";
import { imageServiceFactory } from "./image.service";
import { rateServiceFactory } from "./rate.service";
import { SimpleService } from "./simple.service";

class AuctionProcessServiceImpl extends SimpleService implements IAuctionProcessService {
    async createOrUpdateAuction(dto: ICreateAuctionDTO, userId: string, auctionId: string): Promise<IAuctionModel> {
        return this._dbInstance.$transaction(async (prisma) => {
            const auctionService = auctionServiceFactory(prisma);
            const rateService = rateServiceFactory(prisma);
            const imageService = imageServiceFactory(prisma);
            
            const auction = auctionId
                ? await auctionService.updateAuction(dto, auctionId, true)
                : await auctionService.createAuction(dto, userId)

            if (!auction) {
                throw new Error("Auction was not created or updated.");
            }

            const rateDTO = { rate: dto.initialRate };
            const initialRate = auctionId
                ? await rateService.updateRate(rateDTO, auction.lastRate.id)
                : await rateService.createRate(rateDTO, auction.id, userId);
    
            if (!initialRate) {
                throw new Error("Initial rate was not created.");
            }


            const images = await imageService.uploadImages(dto.images, auction.id, userId);
            if (!images) {
                throw new Error("Images was not created.");
            }
    
            return prisma.auction.update({
                data: { lastRateId: initialRate.id },
                where: { id: auction.id },
                include: { lastRate: true }
            });    
        });
    }

    async createAuctionRate(dto: ICreateRateDTO, auctionId: string, userId: string): Promise<IRateModel> {
        return this._dbInstance.$transaction(async (prisma) => {
            const rateService = rateServiceFactory(prisma);

            const rate = await rateService.createRate(dto, auctionId, userId);
            
            if (!rate) {
                throw new Error("Rate was not created.");
            }

            const updatedAuction = prisma.auction.update({
                data: { lastRateId: rate.id },
                where: { id: auctionId },
                include: { lastRate: true }
            });

            if (!updatedAuction) {
                throw new Error("Auction was not updated.");
            }

            return rate;
        });
    }
}

export function auctionProcessServiceFactory(dbInstance = null): IAuctionProcessService {
    return new AuctionProcessServiceImpl(dbInstance);
}
