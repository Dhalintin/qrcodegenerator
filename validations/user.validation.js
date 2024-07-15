const Joi = require('joi');

const userSchemaValidation = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    jobtitle: Joi.string().required(),
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

const signupSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    password: Joi.string()
        .min(8)
        .required()
});

const loginSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .required()
});

module.exports = { userSchemaValidation, loginSchemaValidation, signupSchemaValidation };
