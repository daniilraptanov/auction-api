export interface ICreateImageDTO {
    source: string;
}

export interface ImageDTO extends ICreateImageDTO {
    id: string;
    userId: string;
    auctionId: string;

    createdAt: Date;
    updatedAt: Date;
}