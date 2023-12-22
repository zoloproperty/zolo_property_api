const Joi = require('joi');

exports.signupValidationSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().allow('', null).optional(),
  number: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string().valid('user', 'admin', 'editor').default('user'),
  interest: Joi.string().valid('car', 'bike').default('car'),
  coordinates: Joi.array().items(Joi.number()).ordered(2).default([]),
  state: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().allow('', null).optional(),
  is_email_verified: Joi.boolean().default(false),
  // created_at: Joi.date().default(() => new Date(), 'current date'),
  updated_at: Joi.date().allow(null),
  email_verify_token: Joi.string().allow('', null).optional(),
  reset_pass_token: Joi.string().allow('', null).optional(),
  reset_pass_expiry: Joi.date().allow(null).optional(),
  is_deleted: Joi.boolean().optional(),
});
exports.loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required()
});


