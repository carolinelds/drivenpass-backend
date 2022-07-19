import Joi from "joi";

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const authSchema = {
    createUserSchema,
    loginSchema
};

export default authSchema;