import Joi from "joi";

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})

const authSchema = {
    createUserSchema
};

export default authSchema;