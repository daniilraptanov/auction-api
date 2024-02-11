import { ICreateRateDTO, IRateDTO } from "./dto/rate.dto";
import { IPaginateModel } from "./tools/pagination.type";
import { IUserModel } from "./user.type";

export interface IRateModel extends IRateDTO {
    user?: IUserModel;
}

export interface IRateService {
    createRate(dto: ICreateRateDTO, auctionId: string, userId: string): Promise<IRateModel>;
    updateRate(dto: ICreateRateDTO, id: string): Promise<IRateModel>;
    getAllRates(page: number, limit: number, auctionId: string, getUserName?: boolean): Promise<IPaginateModel<IRateModel>>;
}

