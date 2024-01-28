const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  property: Joi.string().optional(),
  ads: Joi.string().optional(),
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
    zip_code: Joi.number().required().messages({
      "any.required": "zip code is required.",
    }),
  call: Joi.boolean().default(false),
  leads: Joi.boolean().default(false),
  is_fake: Joi.boolean().default(false),
  email_sent: Joi.boolean().default(false),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  type: Joi.string().valid("ads", "property"),
  status: Joi.string()
    .valid("contacted", "interested", "follow-up", "not-interested")
    .default("interested"),
  is_active: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
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
