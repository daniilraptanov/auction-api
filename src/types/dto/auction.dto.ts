import { AuctionStatus } from "../enums/auction-status.enum";
import { ICreateImageDTO, ImageDTO } from "./image.dto";
import { IRateDTO } from "./rate.dto";

export interface IPlainAuctionDTO {
    description: string;
    status?: AuctionStatus;
}

export interface ICreateAuctionDTO extends IPlainAuctionDTO {
    initialRate: number;
    images: ICreateImageDTO[];
}

export interface IAuctionDTO extends IPlainAuctionDTO {
    id: string;
    userId: string;

    lastRate?: IRateDTO;
    images?: ImageDTO[];
    rates?: IRateDTO[];

    createdAt: Date;
    updatedAt: Date;
}
export interface IExtendAuctionDTO extends IAuctionDTO {
    userIsOwner?: boolean;
}
