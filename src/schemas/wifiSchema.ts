import Joi from "joi";

const wifiSchema = Joi.object({
    name: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    password: Joi.string().trim().required()
});

export default wifiSchema;