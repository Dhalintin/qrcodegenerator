const Joi = require('joi');

const userSchemaValidation = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(2).required(),
    about: Joi.string().min(2).required(),
    phone: Joi.string().trim().regex(/^\+?[0-9]{6,20}$/).required(),
    facebook: Joi.string().uri().allow('').pattern(/^https:\/\/www.facebook.com\//),
    linkedin: Joi.string().uri().allow('').pattern(/^https:\/\/www.linkedin.com\/in\//),
    instagram: Joi.string().uri().allow('').pattern(/^https:\/\/www.instagram.com\//),
    twitter: Joi.string().uri().allow('').pattern(/^https:\/\/www.twitter.com\//),
    whatsapp: Joi.string().uri().allow('').pattern(/^https:\/\/www.wa.me\//),
    telegram: Joi.string().uri().allow('').pattern(/^https:\/\/www.t.me\//),

});

module.exports = { userSchemaValidation };
