import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().max(64).trim(),
  name: Joi.string().required().max(64),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

export const loginSchema = Joi.object({
  username: Joi.string().min(3).required().max(64).trim(),
  password: Joi.string().required().min(8),
});

export const updateSchema = Joi.object({
  username: Joi.string().min(3).max(64).trim(),
  name: Joi.string().min(3).trim(),
  photo: Joi.object({
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/gif"),
    size: Joi.number().max(5 * 1024 * 1024),
  }),
  bio: Joi.string().min(8),
});
