const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  property: Joi.string().optional(),
  ads: Joi.string().optional(),
  name: Joi.string().optional(),
  city: Joi.string().optional(),
  number: Joi.string().optional(),

  zip_code: Joi.number().required().messages({
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
    }).optional(),
  type: Joi.string().valid("like", "view" , "unlike").messages({
    "any.only": 'Type must be either "like", "unlike" or "view"',
  }),
};
exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
  property_id: Joi.string().optional(),
});

exports.likeValidation = Joi.object({
  user_id: Joi.string().required(),
  property_id: Joi.string().optional(),
});
