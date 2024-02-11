import Joi from "joi";
import { MIN_LIMIT, MIN_PAGE } from "../constants";

export const paginationSchema = Joi.object({
    page: Joi.number().min(MIN_PAGE).required(),
    limit: Joi.number().min(MIN_LIMIT).required()
});
