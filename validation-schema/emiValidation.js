const Joi = require("joi");
exports.emiValidationSchema = Joi.object({
  limit: Joi.number().required(),
  offset: Joi.number().default(0),
  startDate: Joi.date(),
  endDate: Joi.date(),
  search: Joi.string(),
  orderBy: Joi.string(),
});

exports.addEmiValidationSchema = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.string().required(),
});

exports.updateEmiValidationSchema = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.string().required(),
  emi_id: Joi.number().required(),
});
