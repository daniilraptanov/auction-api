export interface ICreateRateDTO {
    rate: number;
}

export interface IRateDTO extends ICreateRateDTO {
    id: string;
    userId: string;
    userName?: string;
    auctionId: string;

    createdAt: Date;
    updatedAt: Date;
}
