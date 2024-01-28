const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  property: Joi.string().optional(),
  ads: Joi.string().optional(),

  zip_code: Joi.number().required().messages({
    "any.required": "zip code is required.",
  }),
  coordinates: Joi.array().items(Joi.number()).index("2dsphere"),
  type: Joi.string().valid("like", "view").messages({
    "any.only": 'Type must be either "like" or "view"',
  }),
};
exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
  property_id: Joi.string().optional(),
});
