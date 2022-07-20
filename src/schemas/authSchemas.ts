import Joi from "joi";

const createUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const authSchemas = {
    createUser,
    login
};

export default authSchemas;