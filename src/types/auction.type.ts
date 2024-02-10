import { IAuctionDTO, ICreateAuctionDTO, IPlainAuctionDTO } from "./dto/auction.dto";

export interface IAuctionModel extends IAuctionDTO {}

export interface IAuctionService {
    createAuction(dto: ICreateAuctionDTO, userId: string): Promise<IAuctionModel>;
    updateAuction(dto: IPlainAuctionDTO, id: string): Promise<IAuctionModel>;
    getAllAuctions(page: number, limit: number, getMainImage: boolean): Promise<IAuctionModel[]>;
    getAuctionById(id: string, getImages: boolean): Promise<IAuctionModel>;
}

