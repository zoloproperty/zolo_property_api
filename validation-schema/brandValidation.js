const Joi = require("joi");

const ValidationObj = {
  brand: Joi.string().required().messages({
    "any.required": "Brand name is required.",
  }),
  image: Joi.string().required().messages({
    "any.required": "Brand image is required.",
  }),
  description: Joi.string().required().messages({
    "any.required": "Brand description is required.",
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

exports.addValidation = Joi.object(ValidationObj).options({
  abortEarly: false,
  allowUnknown: true,
});

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required().messages({
    "any.required": "Modal id is required.",
    "string.base": "Modal id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });
