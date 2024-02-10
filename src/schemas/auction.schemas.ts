import Joi from "joi";
import { AuctionStatus } from "../types/enums/auction-status.enum";

export const commonAuctionSchema = Joi.object({
    description: Joi.string().min(5).max(255).required(),
    status: Joi.number().valid(
        AuctionStatus.CREATED,
        AuctionStatus.PROCESSING,
        AuctionStatus.FINISHED,
    ).required()
});

export const createAuctionSchema = commonAuctionSchema.append({
    initialRate: Joi.number().max(9999).required(),
}).custom((schema) => {
    if (schema.initialRate <= 0) {
        throw new Error("Parameter <initialRate> should be greater than zero.");
    }
    return schema;
});

