const Joi = require("joi");

const ValidationObj = {
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
};

exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required().messages({
    "any.required": "Phone id is required.",
    "string.base": "Phone id must be a string.",
  }),
});
