const Joi = require("joi");

// Define Joi schema for contact fields
const ValidationObj = {
  deviceId: Joi.string().required().messages({
    "any.required": "deviceId  is required",
  })
};
exports.addValidation = Joi.object(ValidationObj).options({
  abortEarly: false,
  allowUnknown: true,
});;
