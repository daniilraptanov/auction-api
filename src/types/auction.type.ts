import { IAuctionDTO, ICreateAuctionDTO, IExtendAuctionDTO, IPlainAuctionDTO } from "./dto/auction.dto";
import { IPaginateModel } from "./tools/pagination.type";

export interface IAuctionModel extends IAuctionDTO {}

export interface IAuctionMapper {
    toExtendDTO(model: IAuctionModel, currentUserId: string): IExtendAuctionDTO;
}

export interface IAuctionService {
    createAuction(dto: IPlainAuctionDTO, userId: string): Promise<IAuctionModel>;
    updateAuction(dto: IPlainAuctionDTO, id: string, getLastRate?: boolean): Promise<IAuctionModel>;
    getAllAuctions(page: number, limit: number, getMainImage?: boolean, getLastRate?: boolean): Promise<IPaginateModel<IAuctionModel>>;
    getAuctionById(id: string, getImages?: boolean, getLastRate?: boolean): Promise<IAuctionModel>;
}


export interface IAuctionProcessService {
    createOrUpdateAuction(dto: ICreateAuctionDTO, userId: string, auctionId: string): Promise<IAuctionModel>;
}
