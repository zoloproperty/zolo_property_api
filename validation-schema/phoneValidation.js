const Joi = require("joi");

exports.addValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required.",
    "string.base": "Name must be a string.",
  }),
  number: Joi.string().required().messages({
    "any.required": "Number is required.",
    "string.base": "Number must be a string.",
  }),
  coordinates: Joi.array()
    .items(Joi.number())
    .min(2)
    .max(2)
    .required()
    .messages({
      "any.required": "Coordinates are required.",
      "array.base": "Coordinates must be an array of numbers.",
      "array.min": "Coordinates must have at least two values.",
      "array.max": "Coordinates must have at most two values.",
      "number.base": "Each coordinate value must be a number.",
    }),
  created_at: Joi.date(),
  updated_at: Joi.date(),
});

exports.updateValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required.",
    "string.base": "Name must be a string.",
  }),
  number: Joi.string().required().messages({
    "any.required": "Number is required.",
    "string.base": "Number must be a string.",
  }),
  coordinates: Joi.array()
    .items(Joi.number())
    .min(2)
    .max(2)
    .required()
    .messages({
      "any.required": "Coordinates are required.",
      "array.base": "Coordinates must be an array of numbers.",
      "array.min": "Coordinates must have at least two values.",
      "array.max": "Coordinates must have at most two values.",
      "number.base": "Each coordinate value must be a number.",
    }),
  id: Joi.string().required().messages({
    "any.required": "Phone id is required.",
    "string.base": "Phone id must be a string.",
  }),
});
