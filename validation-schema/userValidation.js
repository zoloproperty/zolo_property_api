const Joi = require("joi");

const ValidationObj = {
  first_name: Joi.string().required().messages({
    "any.required": "Name is required.",
  }),
  last_name: Joi.string().allow("", null).optional(),
  image: Joi.string(),
  contact_number: Joi.number().required().messages({
    "any.required": "Number is required.",
    "number.base": "Number must be a valid number.",
  }),
  email: Joi.string().email().optional(),
  // .required().messages({
  //   "any.required": "Email is required.",
  //   "string.email": "Email must be a valid email address.",
  // }),
  password: Joi.string().min(8).max(20).optional(),
  // .required().messages({
  //   "any.required": "Password is required.",
  //   "string.min": "Password must be at least 8 characters long.",
  //   "string.max": "Password cannot be more than 20 characters long.",
  // }),
  role: Joi.string().valid("user", "admin", "editor" , "broker").default("user"),
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
  state: Joi.string().required().messages({
    "any.required": "State is required.",
  }),
  zip_code: Joi.number().required().messages({
    "any.required": "Zip code is required.",
    "number.base": "Zip code must be a number."
}),
  local_area: Joi.array().optional(),
  city: Joi.string().required().messages({
    "any.required": "City is required.",
  }),
  address: Joi.string(),
  login_type: Joi.string().valid("google", "credential"),
  is_email_verified: Joi.boolean().default(false),
  is_active: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
  email_verify_tokan: Joi.string(),
  reset_pass_tokan: Joi.string(),
  reset_pass_expiry: Joi.string(),
};

exports.signupValidationSchema = Joi.object(ValidationObj).options({
  abortEarly: false,
  allowUnknown: true,
});

delete ValidationObj.password;

exports.updateValidation = Joi.object({
  ...ValidationObj,
  id: Joi.string().required().messages({
    "any.required": "Modal id is required.",
    "string.base": "Modal id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });

exports.loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});
