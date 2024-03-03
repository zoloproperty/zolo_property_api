const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required",
  }),
  zip_code: Joi.number().required().messages({
    "any.required": "zip code is required.",
  }),
  address: Joi.string(),
  status: Joi.number().valid(1, 2, 3),
  show_verified: Joi.boolean().default(false),
  added_by: Joi.number(),
  property_for: Joi.string().valid("sell", "rent", "sold"),
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
  property_type: Joi.string().valid(
    "Shop",
    "Plot",
    "Office",
    "Apartments",
    "House",
    "Villa",
    "Hostel",
    "Pg",
    "Farm"
  ),
  saleable_area: Joi.string(),
  carpet_area: Joi.string(),
  saleable_area_size_in: Joi.string().valid(
    "Feet",
    "Meters",
    "Yards",
    "Bigha",
    "Acres",
    "Hectares"
  ),
  carpet_area_size_in: Joi.string().valid("Feet", "Meters", "Yards"),
  additional_room: Joi.string(),
  expected_price: Joi.number(),
  expected_price_in_sqft: Joi.string(),
  negotiable: Joi.number(),
  booking_price: Joi.number(),
  monthly_rent: Joi.number(),
  security_deposit: Joi.string(),
  maintance_charge: Joi.number(),
  available_from: Joi.date(),
  property_description: Joi.string(),
  open_side: Joi.string().valid("1", "2", "3", "4"),
  facing_side: Joi.string().valid(
    "North",
    "South",
    "West",
    "East",
    "Northeast",
    "Northwest",
    "Southwest",
    "Southeast"
  ),
  facing_road_width: Joi.string(),
  facing_road_width_in: Joi.string().valid("Feet", "Meters"),
  images: Joi.array().items(Joi.string()),
  video: Joi.string(),
  room_data: Joi.string(),
  bedrooms: Joi.string(),
  bathrooms: Joi.number(),
  balconies: Joi.number(),
  additional_facility: Joi.string(),
  property_status: Joi.string().valid("Ready_to_shift", "Underconstruction"),
  property_age: Joi.string(),
  possession_date: Joi.date(),
  description: Joi.string(),
  furnishing_status: Joi.string().valid(
    "Unfurnished",
    "Semi_furnished",
    "Fully_furnished"
  ),
  wardrobe: Joi.number(),
  beds: Joi.number(),
  ac: Joi.number(),
  tv: Joi.number(),
  light: Joi.string(),
  fan: Joi.string(),
  exhaust_fan: Joi.string(),
  boundary_wall: Joi.string(),
  additional_furnishing: Joi.string(),
  other_facility: Joi.string(),
  car_parking_open: Joi.number(),
  car_parking_close: Joi.number(),
  floor: Joi.number(),
  total_floor: Joi.number(),
  overlooking: Joi.string(),
  ownership_type: Joi.string().valid(
    "Freehold",
    "Power_of_attorney",
    "leasehold",
    "Co_Operative_Society"
  ),
  living_room: Joi.string(),
  kitchen: Joi.string(),
  master_bedroom: Joi.string(),
  bathroom: Joi.string(),
  balcony: Joi.string(),
  other_bedroom: Joi.string(),
  preferred_tenants: Joi.string(),
  gender_preference: Joi.string(),
  maximum_tentants_allowed: Joi.string(),
  work_preference: Joi.string(),
  food_preference: Joi.string(),
  expected_duration_of_stay: Joi.string(),
  special_requirement: Joi.string(),
  added_by_type: Joi.string().valid("Owner", "Broker", "Admin"),
  views: Joi.number().default(1),
  admin_status: Joi.string()
    .valid("Pending", "Reject", "Approved")
    .default("Pending"),
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
    "any.required": "Property id is required.",
    "string.base": "Property id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });

exports.OneValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Property id is required.",
    "string.base": "Property id must be a string.",
  }),
}).options({ abortEarly: false, allowUnknown: true });
