import { ICreateRateDTO } from "../types/dto/rate.dto";
import { IRateModel, IRateService } from "../types/rate.type";
import { PaginationService } from "./pagination.service";
import { SimpleService } from "./simple.service";

class RateServiceImpl extends SimpleService implements IRateService {
    createRate(dto: ICreateRateDTO, auctionId: string, userId: string): Promise<IRateModel> {
        return this._dbInstance.rate.create({
            data: {
              rate: dto.rate,
              auctionId,
              userId
            }
        });
    }

    getAllRates(page: number, limit: number, auctionId: string): Promise<IRateModel[]> {
        const { take, skip } = PaginationService.calculateOffset(page, limit);
        return this._dbInstance.rate.findMany({
            take, skip, where: { auctionId }
        });
    }
}

export function rateServiceFactory(dbInstance = null): IRateService {
  return new RateServiceImpl(dbInstance);
}