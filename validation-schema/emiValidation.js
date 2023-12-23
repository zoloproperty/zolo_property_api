const Joi = require("joi");
exports.emiValidationSchema = Joi.object({
  limit: Joi.number().default(5),
  offset: Joi.number().default(0),
});

exports.addEmiValidationSchema = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.number().required(),
});

exports.updateEmiValidationSchema = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.number().required(),
  id: Joi.string().required(),
});
