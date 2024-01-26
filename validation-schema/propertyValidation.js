const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required",
  }),
  zip_code: Joi.number().required().messages({
    "any.required": "Zip code is required",
  }),
  address: Joi.string(),
  status: Joi.number().valid(1, 2, 3),
  show_verified: Joi.boolean().default(false),
  added_by: Joi.number().default(null),
  property_for: Joi.string().valid("sell", "rent", "sold").default(null),
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
  location: Joi.string().required().messages({
    "any.required": "Location is required",
  }),
  property_type: Joi.string()
    .valid(
      "Shop",
      "Plot",
      "Office",
      "Apartments",
      "House",
      "Villa",
      "Hostel",
      "Pg",
      "Farm"
    )
    .default(null),
  saleable_area: Joi.string().default(null),
  carpet_area: Joi.string().default(null),
  saleable_area_size_in: Joi.string()
    .valid("Feet", "Meters", "Yards", "Bigha", "Acres", "Hectares")
    .default(null),
  carpet_area_size_in: Joi.string()
    .valid("Feet", "Meters", "Yards")
    .default(null),
  additional_room: Joi.string().default(null),
  expected_price: Joi.number().default(null),
  expected_price_in_sqft: Joi.string().default(null),
  negotiable: Joi.number().default(null),
  booking_price: Joi.number().default(null),
  monthly_rent: Joi.number().default(null),
  security_deposit: Joi.string().default(null),
  maintance_charge: Joi.string().default(null),
  available_from: Joi.date().default(null),
  property_description: Joi.string().default(null),
  open_side: Joi.string().valid("1", "2", "3", "4").default(null),
  facing_side: Joi.string()
    .valid(
      "North",
      "South",
      "West",
      "East",
      "Northeast",
      "Northwest",
      "Southwest",
      "Southeast"
    )
    .default(null),
  facing_road_width: Joi.string().default(null),
  facing_road_width_in: Joi.string().valid("Feet", "Meters").default(null),
  images: Joi.array().items(Joi.string().default(null)),
  video: Joi.string().default(null),
  room_data: Joi.string().default(null),
  bedrooms: Joi.string().default(null),
  bathrooms: Joi.number().default(null),
  balconies: Joi.number().default(null),
  additional_facility: Joi.string().default(null),
  property_status: Joi.string()
    .valid("Ready_to_shift", "Underconstruction")
    .default(null),
  property_age: Joi.string().default(null),
  possession_date: Joi.date().default(null),
  description: Joi.string().default(null),
  furnishing_status: Joi.string()
    .valid("Unfurnished", "Semi_furnished", "Fully_furnished")
    .default(null),
  wardrobe: Joi.number().default(null),
  beds: Joi.number().default(null),
  ac: Joi.number().default(null),
  tv: Joi.number().default(null),
  light: Joi.string().default(null),
  fan: Joi.string().default(null),
  exhaust_fan: Joi.string().default(null),
  boundary_wall: Joi.string().default(null),
  additional_furnishing: Joi.string().default(null),
  other_facility: Joi.string().default(null),
  car_parking_open: Joi.number().default(null),
  car_parking_close: Joi.number().default(null),
  floor: Joi.number().default(null),
  total_floor: Joi.number().default(null),
  overlooking: Joi.string().default(null),
  ownership_type: Joi.string()
    .valid("Freehold", "Power_of_attorney", "leasehold", "Co_Operative_Society")
    .default(null),
  living_room: Joi.string().default(null),
  kitchen: Joi.string().default(null),
  master_bedroom: Joi.string().default(null),
  bathroom: Joi.string().default(null),
  balcony: Joi.string().default(null),
  other_bedroom: Joi.string().default(null),
  preferred_tenants: Joi.string().default(null),
  gender_preference: Joi.string().default(null),
  maximum_tentants_allowed: Joi.string().default(null),
  work_preference: Joi.string().default(null),
  food_preference: Joi.string().default(null),
  expected_duration_of_stay: Joi.string().default(null),
  special_requirement: Joi.string().default(null),
  added_by_type: Joi.string().valid("Owner", "Broker", "Admin").default(null),
  views: Joi.number().default(1),
  admin_status: Joi.string()
    .valid("Pending", "Reject", "Approved")
    .required()
    .messages({
      "any.required": "Admin status is required",
    }),
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
    "any.required": "Modal id is required.",
    "string.base": "Modal id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });
