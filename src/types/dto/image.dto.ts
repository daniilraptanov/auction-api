export interface ICreateImageDTO {
    source: string;
}

export interface ImageDTO extends ICreateImageDTO {
    id: string;
    auctionId: string;

    createdAt: Date;
    updatedAt: Date;
}