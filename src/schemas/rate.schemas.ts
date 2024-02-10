import Joi from "joi";
import { MAX_RATE } from "../constants";

export const rateSchema = Joi.object({
    rate: Joi.number().max(MAX_RATE).required()
}).custom((schema) => {
    if (schema.rate <= 0) {
        throw new Error("Parameter <rate> should be greater than zero.");
    }
    return schema;
});

