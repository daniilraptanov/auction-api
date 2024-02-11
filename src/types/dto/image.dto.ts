export interface ICreateImageDTO {
    id?: string;
    source: string;
}

export interface ImageDTO extends ICreateImageDTO {
    id: string;
    userId: string;
    auctionId: string;

    createdAt: Date;
    updatedAt: Date;
}