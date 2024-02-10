import { ICreateRateDTO, IRateDTO } from "./dto/rate.dto";

export interface IRateModel extends IRateDTO {}

export interface IRateService {
    createRate(dto: ICreateRateDTO): Promise<IRateModel>;
    getAllRates(page: number, limit: number, auctionId: string): Promise<IRateModel[]>;
}

