import { IAuctionDTO, ICreateAuctionDTO, IExtendAuctionDTO, IPlainAuctionDTO } from "./dto/auction.dto";

export interface IAuctionModel extends IAuctionDTO {}

export interface IAuctionMapper {
    toExtendDTO(model: IAuctionModel, currentUserId: string): IExtendAuctionDTO;
}

export interface IAuctionService {
    createAuction(dto: ICreateAuctionDTO, userId: string): Promise<IAuctionModel>;
    updateAuction(dto: IPlainAuctionDTO, id: string): Promise<IAuctionModel>;
    getAllAuctions(page: number, limit: number, getMainImage?: boolean, getLastRate?: boolean): Promise<IAuctionModel[]>;
    getAuctionById(id: string, getImages?: boolean, getLastRate?: boolean): Promise<IAuctionModel>;
}

