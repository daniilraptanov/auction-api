import Joi from "joi";

export const imageSchema = Joi.object({
    auctionId: Joi.string().required(),
    source: Joi.string().required()
});

export const deleteImageSchema = Joi.object({
    id: Joi.string().required(),
    auctionId: Joi.string().required(),
});
