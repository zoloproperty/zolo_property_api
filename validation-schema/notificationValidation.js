const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  
};
exports.addValidation = Joi.object(ValidationObj).options({ abortEarly: false, allowUnknown: true });;