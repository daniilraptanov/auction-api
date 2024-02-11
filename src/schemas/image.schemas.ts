import Joi from "joi";


export const commonImageSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).optional(),
    source: Joi.string().required()
});

export const imageSchema = commonImageSchema.append({
    auctionId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export const deleteImageSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    auctionId: Joi.string().guid({ version: 'uuidv4' }).required(),
});
