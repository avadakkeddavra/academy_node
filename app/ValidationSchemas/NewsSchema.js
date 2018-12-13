const Joi = require('joi');

const CreateSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    attachements: Joi.array(),
    main_img: Joi.number(),
    tags: Joi.array()
});

module.exports = {
    create: CreateSchema
}
