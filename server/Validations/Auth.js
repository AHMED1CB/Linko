import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required().max(64).trim(),
    name: Joi.string().required().max(64),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
})


export const loginSchema = Joi.object({
    username: Joi.string().min(3).required().max(64).trim(),
    password: Joi.string().required().min(8),
})

