const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  ads_name: Joi.string().required().messages({
    "any.required": "Ads name is required",
  }),
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  banner: Joi.string().required().messages({
    "any.required": "Ads main Image is required",
  }),
  gallery: Joi.array().items(Joi.string().default(null)),
  show_number: Joi.boolean().default(true),
  show_map: Joi.boolean().default(true),
  number: Joi.string().required().messages({
    "any.required": "Number is required",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required",
  }),
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
  is_active: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
  expiry_date: Joi.date().default(() => {
    const currentDate = new Date();
    const next30Days = new Date(currentDate);
    next30Days.setDate(currentDate.getDate() + 30);
    return next30Days;
  }),
};
exports.addValidation = Joi.object(ValidationObj);

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required(),
  property_id: Joi.string().optional(),
}).options({ abortEarly: false, allowUnknown: true });
