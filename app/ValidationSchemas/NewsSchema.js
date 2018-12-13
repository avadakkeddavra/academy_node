const Joi = require('joi');

const CreateSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    attachements: Joi.any(),
    tags: Joi.string().empty('')
});

module.exports = {
    create: CreateSchema
}