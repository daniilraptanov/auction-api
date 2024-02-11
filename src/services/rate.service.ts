import { ICreateRateDTO } from "../types/dto/rate.dto";
import { IRateModel, IRateService } from "../types/rate.type";
import { IPaginateModel } from "../types/tools/pagination.type";
import { PaginationService } from "./pagination.service";
import { SimpleService } from "./simple.service";

class RateServiceImpl extends SimpleService implements IRateService {
    async createRate(dto: ICreateRateDTO, auctionId: string, userId: string): Promise<IRateModel> {
        return this._dbInstance.rate.create({
            data: {
              rate: dto.rate,
              auctionId,
              userId
            }
        });
    }

    async updateRate(dto: ICreateRateDTO, id: string): Promise<IRateModel> {
        return this._dbInstance.rate.update({
            data: { rate: dto.rate },
            where: { id } 
        });
    }

    async getAllRates(page: number, limit: number, auctionId: string, getUserName?: boolean): Promise<IPaginateModel<IRateModel>> {
        const { take, skip } = PaginationService.calculateOffset(page, limit);
        const where = { auctionId };

        const include = {};
        if (getUserName) {
            include["user"] = true;
        }

        const [rows, totalRows] = await this._dbInstance.$transaction([
            this._dbInstance.rate.findMany({ take, skip, where, include }),
            this._dbInstance.rate.count({ where })
        ]);

        return {
            rows,
            totalRows,
            totalPage: PaginationService.calculateTotalPage(totalRows, limit)
        }
    }
}

export function rateServiceFactory(dbInstance = null): IRateService {
  return new RateServiceImpl(dbInstance);
}