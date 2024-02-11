import { IAuctionModel, IAuctionService } from "../types/auction.type";
import { IPlainAuctionDTO } from "../types/dto/auction.dto";
import { AuctionStatus } from "../types/enums/auction-status.enum";
import { PaginationService } from "./pagination.service";
import { SimpleService } from "./simple.service";

class AuctionServiceImpl extends SimpleService implements IAuctionService {
    async createAuction(dto: IPlainAuctionDTO, userId: string): Promise<IAuctionModel> {
        return this._dbInstance.auction.create({
            data: {
                description: dto.description,
                status: AuctionStatus.CREATED,
                userId
            }
        });
    }

    async updateAuction(dto: IPlainAuctionDTO, id: string, getLastRate = false): Promise<IAuctionModel> {
        const include = {}
        if (getLastRate) {
            include["lastRate"] = true;
        }

        return this._dbInstance.auction.update({
            data: {
                description: dto.description,
                status: dto.status,
            },
            where: { id },
            include
        });
    }

    async getAllAuctions(
        page: number, 
        limit: number, 
        getMainImage: boolean = false,
        getLastRate: boolean = false
    ): Promise<IAuctionModel[]> {
        const { take, skip } = PaginationService.calculateOffset(page, limit);
        
        const include = {};
        if (getMainImage) {
            include["images"] = { take: 1 };
        }
        if (getLastRate) {
            include["lastRate"] = true;
        }
        
        return this._dbInstance.auction.findMany({
            take, skip, include
        });
    }

    async getAuctionById(
        id: string, 
        getImages: boolean = false, 
        getLastRate: boolean = false
    ): Promise<IAuctionModel> {
        const include = {};
        if (getImages) {
            include["images"] = true;
        }
        if (getLastRate) {
            include["lastRate"] = true;
        }

        return this._dbInstance.auction.findFirst({
            where: { id }, include
        });
    }
}

export function auctionServiceFactory(dbInstance = null): IAuctionService {
  return new AuctionServiceImpl(dbInstance);
}
