import Joi from "joi";
import { MAX_RATE } from "../constants";
import { paginationSchema } from "./pagination.schemas";

export const rateSchema = Joi.object({
    auctionId: Joi.string().guid({ version: 'uuidv4' }).required(),
    rate: Joi.number().max(MAX_RATE).required()
}).custom((schema) => {
    if (schema.rate <= 0) {
        throw new Error("Parameter <rate> should be greater than zero.");
    }
    return schema;
});

export const getAllRatesSchema = paginationSchema.append({
    auctionId: Joi.string().guid({ version: 'uuidv4' }).required()
});
