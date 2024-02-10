import { IAuctionDTO, ICreateAuctionDTO, IPlainAuctionDTO } from "./dto/auction.dto";

export interface IAuctionModel extends IAuctionDTO {}

export interface IAuctionService {
    createAuction(dto: ICreateAuctionDTO): Promise<IAuctionModel>;
    updateAuction(id: string, dto: IPlainAuctionDTO): Promise<IAuctionModel>;
    getAllAuctions(page: number, limit: number, getImages: boolean): Promise<IAuctionModel[]>;
}

