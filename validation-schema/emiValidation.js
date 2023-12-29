const Joi = require("joi");

const ValidationObj = {
  limit: Joi.number().required().messages({
    "any.required": "Limit is required.",
    "number.base": "Limit must be a number.",
  }),
  emi: Joi.number().required().messages({
    "any.required": "EMI is required.",
    "number.base": "EMI must be a number.",
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
  id: Joi.string().required(),
});
