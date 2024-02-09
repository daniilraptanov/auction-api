import { AuctionStatus } from "../enums/auction-status.enum";
import { ImageDTO } from "./image.dto";
import { IRateDTO } from "./rate.dto";

export interface IPlainAuctionDTO {
    description: string;
    status: AuctionStatus;
}

export interface ICreateAuctionDTO extends IPlainAuctionDTO {
    initialRate: number;
}

export interface IAuctionDTO extends IPlainAuctionDTO {
    id: string;
    userId: string;

    lastRate: IRateDTO;
    images: ImageDTO[];
    rates: IRateDTO[];

    createdAt: Date;
    updatedAt: Date;
}