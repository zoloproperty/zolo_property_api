const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  number: Joi.string().required().messages({
    "any.required": "Number is required",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required",
  }),
  zip_code: Joi.number().min(6)
  .max(6).required().messages({
    "any.required": "zip code is required.",
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
  is_active: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
};

exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required().messages({
    "any.required": "Phone id is required.",
    "string.base": "Phone id must be a string.",
  }),
});
