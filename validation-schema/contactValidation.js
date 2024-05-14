const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {

  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
  }),
  contact_number: Joi.string().required().messages({
    "any.required": "Contact number is required",
    "string.unique": "Contact value already exists, please try another value.",
  }),
};

exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
});
