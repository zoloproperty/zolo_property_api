const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User is required.",
  }),
  vehicle: Joi.string().required().messages({
    "any.required": "Vehicle is required.",
  }),
  coordinates: Joi.array().items(Joi.number()).length(2).messages({
    "array.base": "Coordinates must be an array of two numbers.",
    "array.length": "Coordinates must be an array of two numbers.",
    "number.base": "Coordinates must be numbers.",
  }),
  call: Joi.boolean().default(false).messages({
    "boolean.base": "Call must be a boolean.",
    "any.default": "Default value for Call is false.",
  }),
  leads: Joi.boolean().default(false).messages({
    "boolean.base": "Leads must be a boolean.",
    "any.default": "Default value for Leads is false.",
  }),
  note: Joi.string().allow("").optional().messages({
    "string.base": "Note must be a string.",
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
    "any.required": "Vehicle id is required.",
    "string.base": "Vehicle id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });
