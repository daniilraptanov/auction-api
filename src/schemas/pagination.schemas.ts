import Joi from "joi";

export const paginationSchema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required()
});
