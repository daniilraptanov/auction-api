import Joi from "joi";

export const loginSchema = Joi.object({
  login: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(5).max(255).required(),
});

export const registrationSchema = loginSchema.append({
  confirmPassword: Joi.string().min(5).max(255).required(),
}).custom((schema) => {
  if (schema.password !== schema.confirmPassword) {
    throw new Error("Parameter <password> should be equal <confirmPassword>.");
  }
  return schema;
});
