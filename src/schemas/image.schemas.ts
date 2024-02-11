import Joi from "joi";


export const commonImageSchema = Joi.object({
    id: Joi.string().optional(),
    source: Joi.string().required()
});

export const imageSchema = commonImageSchema.append({
    auctionId: Joi.string().required(),
});

export const deleteImageSchema = Joi.object({
    id: Joi.string().required(),
    auctionId: Joi.string().required(),
});
