import Joi from "joi";

const notesSchema = Joi.object({
    title: Joi.string().max(50).trim().required(),
    text: Joi.string().max(1000).trim().required()
});

export default notesSchema;