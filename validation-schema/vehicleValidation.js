const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User is required.",
  }),
  product_type: Joi.string().valid("car", "bike").default("car"),
  brand: Joi.string().required().messages({
    'any.required': 'Brand is required.',
  }),
  modal: Joi.string().required().messages({
    'any.required': 'Model is required.',
  }),
  purchase_year: Joi.string().required().messages({
    "any.required": "Purchase year is required.",
  }),
  fuel_type: Joi.string().required().messages({
    "any.required": "Fuel type is required.",
  }),
  mileage: Joi.string(),
  km_run: Joi.string().required().messages({
    "any.required": "KM run is required.",
  }),
  onnership: Joi.number().valid(1, 2, 3, 4, 5, 7, 8),
  coordinates: Joi.array().items(Joi.number()).length(2).messages({
    "array.base": "Coordinates must be an array of two numbers.",
    "array.length": "Coordinates must be an array of two numbers.",
    "number.base": "Coordinates must be numbers.",
  }),
  description: Joi.string(),
  price: Joi.number().required().messages({
    "any.required": "Price is required.",
  }),
  image: Joi.array().items(Joi.string()),
  video: Joi.array().items(Joi.string()),
  city: Joi.string().required().messages({
    "any.required": "City is required.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required.",
  }),
  address: Joi.string(),
  status: Joi.number().valid(1, 2, 3).messages({
    "number.base": "Status must be a number.",
    "any.only":
      "Status must be either 1 (pending), 2 (approved), or 3 (sold out).",
  }),
  showVerified: Joi.boolean().default(false).messages({
    "boolean.base": "ShowVerified must be a boolean.",
    "any.default": "Default value for ShowVerified is false.",
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
