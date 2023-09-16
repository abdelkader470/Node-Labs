import Joi from "joi";

const signUpValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9]{3,}$/),
  phone: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female", "other"),
});
const signInValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["net", "com"] } })
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9]{3,}$/),
});

export { signUpValidationSchema, signInValidationSchema };
