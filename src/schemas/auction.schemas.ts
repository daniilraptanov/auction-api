import Joi from "joi";
import { MAX_AUCTION_IMAGES, MAX_RATE, MIN_AUCTION_IMAGES, MIN_RATE } from "../constants";
import { AuctionStatus } from "../types/enums/auction-status.enum";
import { commonImageSchema } from "./image.schemas";
import { paginationSchema } from "./pagination.schemas";

const commonAuctionSchema = Joi.object({
    description: Joi.string().min(5).max(255).required(),
    images: Joi.array()
        .items(commonImageSchema)
        .min(MIN_AUCTION_IMAGES)
        .max(MAX_AUCTION_IMAGES)
        .required()
});

export const createAuctionSchema = commonAuctionSchema.append({
    initialRate: Joi.number().max(MAX_RATE).required(),
}).custom((schema) => {
    if (schema.initialRate <= 0) {
        throw new Error("Parameter <initialRate> should be greater than zero.");
    }
    return schema;
});

export const updateAuctionSchema = createAuctionSchema.append({
    id: Joi.string().required(),
    status: Joi.number().valid(
        AuctionStatus.CREATED,
        AuctionStatus.PROCESSING,
        AuctionStatus.FINISHED,
    ).optional()
});

export const getAllAuctionsSchema = paginationSchema.append({
    getMainImage: Joi.boolean().optional(),
    getLastRate: Joi.boolean().optional(),
    minRate: Joi.number().min(MIN_RATE).max(MAX_RATE).optional(),
    maxRate: Joi.number().min(MIN_RATE).max(MAX_RATE).optional()
}).custom((schema) => {
    if (schema.minRate && schema.maxRate && (schema.maxRate < schema.minRate)) {
        throw new Error("Parameter <maxRate> should be greater than <minRate>.");
    }
    return schema;
});

export const getAuctionSchema = Joi.object({
    id: Joi.string().required(),
    getImages: Joi.boolean().optional(),
    getLastRate: Joi.boolean().optional()
});
