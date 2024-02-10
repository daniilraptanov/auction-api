import { ICreateRateDTO, IRateDTO } from "./dto/rate.dto";

export interface IRateModel extends IRateDTO {}

export interface IRateService {
    createRate(dto: ICreateRateDTO, auctionId: string, userId: string): Promise<IRateModel>;
    getAllRates(page: number, limit: number, auctionId: string): Promise<IRateModel[]>;
}

