import { IAuctionModel, IAuctionService } from "../types/auction.type";
import { ICreateAuctionDTO, IPlainAuctionDTO } from "../types/dto/auction.dto";
import { AuctionStatus } from "../types/enums/auction-status.enum";
import { PaginationService } from "./pagination.service";
import { rateServiceFactory } from "./rate.service";
import { SimpleService } from "./simple.service";

class AuctionServiceImpl extends SimpleService implements IAuctionService {
    async createAuction(dto: ICreateAuctionDTO, userId: string): Promise<IAuctionModel> {
        return this._dbInstance.$transaction(async (prisma) => {
            const auction = await prisma.auction.create({
                data: {
                    description: dto.description,
                    status: AuctionStatus.CREATED,
                    userId
                }
            });
    
            if (!auction) {
                throw new Error("Auction was not created.");
            }
    
            const initialRate = await rateServiceFactory(prisma).createRate(
                { rate: dto.initialRate },
                auction.id,
                userId
            );
    
            if (!initialRate) {
                throw new Error("Initial rate was not created.");
            }
    
            return this._dbInstance.auction.update({
                data: { lastRateId: initialRate.id },
                where: { id: auction.id },
                include: { lastRate: true }
            });    
        });
    }

    async updateAuction(dto: IPlainAuctionDTO, id: string): Promise<IAuctionModel> {
        return this._dbInstance.auction.update({
            data: dto,
            where: { id } 
        });
    }

    async getAllAuctions(page: number, limit: number, getMainImage: boolean): Promise<IAuctionModel[]> {
        const { take, skip } = PaginationService.calculateOffset(page, limit);
        return this._dbInstance.auction.findMany({
            take, skip, include: { images: { take: +getMainImage } }
        });
    }

    async getAuctionById(id: string, getImages: boolean = false): Promise<IAuctionModel> {
        return this._dbInstance.auction.findFirst({
            where: { id },
            include: { images: getImages }
        });
    }
}

export function auctionServiceFactory(dbInstance = null): IAuctionService {
  return new AuctionServiceImpl(dbInstance);
}
