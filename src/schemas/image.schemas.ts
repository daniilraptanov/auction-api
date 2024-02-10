import Joi from "joi";

export const imageSchema = Joi.object({
    auctionId: Joi.string().required(),
    source: Joi.string().min(5).max(255).required()
});

export const deleteImageSchema = Joi.object({
    id: Joi.string().required(),
    auctionId: Joi.string().required(),
});
