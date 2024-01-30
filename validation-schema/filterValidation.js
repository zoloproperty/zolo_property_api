const Joi = require("joi");

exports.filterMapValidation = Joi.object({
  limit: Joi.number().default(5).messages({
    "number.base": "Limit must be a number.",
    "number.default": "Default value for limit is 5.",
  }),
  offset: Joi.number().default(0).messages({
    "number.base": "Offset must be a number.",
    "number.default": "Default value for offset is 0.",
  }),
  startDate: Joi.date().allow("", null).messages({
    "date.base": "Start date must be a valid date or empty string.",
  }),
  search: Joi.string().allow("", null).messages({
    "string.base": "Search must be a string.",
  }),
  order: Joi.string().allow("", null).messages({
    "string.base": "order must be a string.",
  }),
  endDate: Joi.date().allow("", null).messages({
    "date.base": "End date must be a valid date or empty string.",
  }),
  orderBy: Joi.string().allow("").optional().messages({
    "string.base": "OrderBy must be a string or empty string.",
  }),
  city: Joi.string()
    .messages({
      "string.base": "City must be a string.",
    })
    .allow(""),
  search: Joi.string()
    .messages({
      "string.base": "Search must be a string.",
    })
    .allow(""),
  radius: Joi.number()
    .positive()
    .default(10000)
    .messages({
      "number.base": "Radius must be a positive number.",
      "number.default": "Default value for radius is 10000.",
    })
    .allow(""),
  coordinates: Joi.array()
    .items(Joi.number())
    .min(2)
    .max(2)
    .messages({
      "array.base": "Coordinates must be an array of two numbers.",
      "array.min": "Coordinates must be an array of two numbers.",
      "array.max": "Coordinates must be an array of two numbers.",
      "number.base": "Coordinates must be numbers.",
    })
    .allow(""),
  orderBy: Joi.string()
    .messages({
      "string.base": "OrderBy must be a string.",
    })
    .allow(""),
});

exports.filterValidation = Joi.object({
  limit: Joi.number().default(5).messages({
    "number.base": "Limit must be a number.",
    "number.default": "Default value for limit is 5.",
  }),
  offset: Joi.number().default(0).messages({
    "number.base": "Offset must be a number.",
    "number.default": "Default value for offset is 0.",
  }),
  startDate: Joi.date().allow("", null).messages({
    "date.base": "Start date must be a valid date or empty string.",
  }),
  search: Joi.string().allow("", null).messages({
    "string.base": "Search must be a string.",
  }),
  order: Joi.string().allow("", null).messages({
    "string.base": "order must be a string.",
  }),
  endDate: Joi.date().allow("", null).messages({
    "date.base": "End date must be a valid date or empty string.",
  }),
  orderBy: Joi.string().allow("").optional().messages({
    "string.base": "OrderBy must be a string or empty string.",
  }),
});
