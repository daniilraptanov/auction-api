import Joi from "joi";

export const imageSchema = Joi.object({
    source: Joi.string().min(5).max(255).required()
});

