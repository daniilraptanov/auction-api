import Joi from "joi";
import { MAX_RATE } from "../constants";
import { AuctionStatus } from "../types/enums/auction-status.enum";
import { paginationSchema } from "./pagination.schemas";

const commonAuctionSchema = Joi.object({
    description: Joi.string().min(5).max(255).required(),
    status: Joi.number().valid(
        AuctionStatus.CREATED,
        AuctionStatus.PROCESSING,
        AuctionStatus.FINISHED,
    ).required()
});

export const createAuctionSchema = commonAuctionSchema.append({
    initialRate: Joi.number().max(MAX_RATE).required(),
}).custom((schema) => {
    if (schema.initialRate <= 0) {
        throw new Error("Parameter <initialRate> should be greater than zero.");
    }
    return schema;
});

export const updateAuctionSchema = commonAuctionSchema.append({
    id: Joi.string().required()
});

export const getAllAuctionsSchema = paginationSchema.append({
    getMainImage: Joi.boolean().optional(),
    getLastRate: Joi.boolean().optional()
});

export const getAuctionSchema = Joi.object({
    id: Joi.string().required(),
    getImages: Joi.boolean().optional(),
    getLastRate: Joi.boolean().optional()
});
