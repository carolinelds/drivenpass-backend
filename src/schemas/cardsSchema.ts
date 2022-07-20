import Joi from "joi";

const cardsSchema = Joi.object({
    number: Joi.string().trim().required(),
    cardholderName: Joi.string().trim().required(),
    securityCode: Joi.string().trim().required(),
    expirationDate: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    type: Joi.string().valid('crédito','débito','crédito e débito').trim().required(),
    isVirtual: Joi.bool().required()
});

export default cardsSchema;