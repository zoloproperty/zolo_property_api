const Joi = require("joi");
exports.listValidation = Joi.object({
  limit: Joi.number().default(5),
  offset: Joi.number().default(0),
  startDate: Joi.date(),
  endDate: Joi.date(),
  orderBy: Joi.string(),
});

exports.addValidation = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.number().required(),
});

exports.updateValidation = Joi.object({
  limit: Joi.number().required(),
  emi: Joi.number().required(),
  id: Joi.string().required(),
});
