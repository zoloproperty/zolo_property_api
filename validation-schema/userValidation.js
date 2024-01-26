const Joi = require("joi");

exports.signupValidationSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "Name is required.",
  }),
  last_name: Joi.string().allow("", null).optional(),
  contact_number: Joi.number().required().messages({
    "any.required": "Number is required.",
    "number.base": "Number must be a valid number.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "any.required": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot be more than 20 characters long.",
  }),
  role: Joi.string().valid("user", "admin", "editor").default("user"),
  coordinates: Joi.array().items(Joi.number()).ordered(2).default([]).messages({
    "array.base": "Coordinates must be an array of two numbers.",
    "array.ordered": "Coordinates must be an array of two numbers.",
    "number.base": "Coordinates must be numbers.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required.",
  }),
  zip_code: Joi.string().required().messages({
    "any.required": "zip code is required.",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required.",
  }),
  address: Joi.string().allow("", null).optional(),
  is_email_verified: Joi.boolean().default(false),
  email_verify_token: Joi.string().allow("", null).optional(),
  reset_pass_token: Joi.string().allow("", null).optional(),
  reset_pass_expiry: Joi.date().allow(null).optional(),
  isActive: Joi.boolean().default(true).messages({
    "boolean.base": "isActive must be a boolean.",
    "any.default": "Default value for isActive is true.",
    "boolean.required": "isActive is required.",
  }),
  isDeleted: Joi.boolean().default(false).messages({
    "boolean.base": "isDeleted must be a boolean.",
    "any.default": "Default value for isDeleted is false.",
    "boolean.required": "isDeleted is required.",
  }),
});
exports.loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});
