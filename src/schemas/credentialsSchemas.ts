import Joi from "joi";

const createCredential = Joi.object({
    url: Joi.string().uri().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    title: Joi.string().trim().required()
});

const credentialsSchemas = {
    createCredential
};

export default credentialsSchemas;