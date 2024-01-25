const Joi = require('joi');

// Define Joi schema for contact fields
const ValidationObj = {
  property_id: Joi.string().required().messages({
    'any.required': 'Property ID is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required',
    'string.base': 'Address must be a string',
  }),
  contact_number: Joi.string().required().messages({
    'any.required': 'Contact number is required',
    'string.base': 'Contact number must be a string',
  }),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now),
  status: Joi.string().valid('contacted', 'interested', 'follow-up', 'not-interested').default('interested'),
  isFake: Joi.boolean().default(false),
  emailSent: Joi.boolean().default(false),
  isDeleted: Joi.boolean().default(false),
};

exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
});

