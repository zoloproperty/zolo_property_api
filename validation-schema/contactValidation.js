const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  property_id: Joi.string().required().messages({
    "any.required": "Property ID is required",
  }),
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
  created_at: Joi.date().default(() => new Date()),
  updated_at: Joi.date().default(() => new Date()),
  status: Joi.string()
    .valid("contacted", "interested", "follow-up", "not-interested")
    .default("interested"),
  is_fake: Joi.boolean().default(false),
  email_sent: Joi.boolean().default(false),
  is_active: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
};

exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
  property_id: Joi.string().optional(),
});
