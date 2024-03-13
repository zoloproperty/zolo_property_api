const Joi = require("joi");

const ValidationObj = {
  user: Joi.string().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  zip_code: Joi.number().required(),
  address: Joi.string(),
  status: Joi.number().valid(1, 2, 3),
  show_verified: Joi.boolean(),
  property_for: Joi.string().valid("sell", "rent", "sold").required(),
  coordinates: Joi.array().items(Joi.number()).length(2),
  location: Joi.string().required(),
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
    .default("House"),
  saleable_area: Joi.string().default(""),
  carpet_area: Joi.string().default(""),
  saleable_area_size_in: Joi.string()
    .valid("Feet", "Meters", "Yards", "Bigha", "Acres", "Hectares")
    .default("Feet"),
  carpet_area_size_in: Joi.string()
    .valid("Feet", "Meters", "Yards")
    .default("Feet"),
  additional_room: Joi.array().items(Joi.string()).default([]),
  expected_price: Joi.number().default(0),
  expected_price_in_sqft: Joi.number().default(0),
  negotiable: Joi.boolean().default(true),
  booking_price: Joi.number().default(0),
  monthly_rent: Joi.number().default(0),
  security_deposit: Joi.string().default("0"),
  maintance_charge: Joi.number().default(0),
  available_from: Joi.date().default(""),
  property_description: Joi.string().default(""),
  open_side: Joi.string().valid("0", "1", "2", "3", "4").default("0"),
  facing_side: Joi.string()
    .valid(
      "North",
      "South",
      "West",
      "East",
      "Northeast",
      "Northwest",
      "Southwest",
      "Southeast",
      ""
    )
    .default(""),
  facing_road_width: Joi.string().default(""),
  facing_road_width_in: Joi.string().valid("Feet", "Meters").default("Feet"),
  images: Joi.array().items(Joi.string()).default([]),
  video: Joi.string().default(""),
  room_data: Joi.array()
    .items(
      Joi.object({
        room_type: Joi.string().default(""),
        no_of_rooms: Joi.number(),
        price: Joi.string(),
      })
    )
    .default([]),
  bedrooms: Joi.string().default(""),
  bathrooms: Joi.number().default(""),
  balconies: Joi.number().default(""),
  additional_facility: Joi.array().items(Joi.string()).default([]),
  property_status: Joi.string()
    .valid("Ready_to_shift", "Underconstruction")
    .default("Ready_to_shift"),
  property_age: Joi.string().default(""),
  possession_date: Joi.date().default(""),
  description: Joi.string().default(""),
  furnishing_status: Joi.string()
    .valid("", "Unfurnished", "Semi_furnished", "Fully_furnished")
    .default(""),
  wardrobe: Joi.number().default(""),
  beds: Joi.number().default(""),
  ac: Joi.number().default(""),
  tv: Joi.number().default(""),
  light: Joi.string().default(""),
  fan: Joi.string().default(""),
  exhaust_fan: Joi.string().default(""),
  boundary_wall: Joi.string().default(""),
  additional_furnishing: Joi.array().items(Joi.string()).default([]),
  other_facility: Joi.string().default(""),
  car_parking_open: Joi.number().default(""),
  car_parking_close: Joi.number().default(""),
  floor: Joi.number().default(""),
  total_floor: Joi.number().default(""),
  overlooking: Joi.array().items(Joi.string()).default([]),
  ownership_type: Joi.string()
    .valid("Freehold", "Power_of_attorney", "leasehold", "Co_Operative_Society")
    .default("Freehold"),
  living_room: Joi.string().default(""),
  kitchen: Joi.string().default(""),
  master_bedroom: Joi.string().default(""),
  bathroom: Joi.string().default(""),
  balcony: Joi.string().default(""),
  other_bedroom: Joi.string().default(""),
  preferred_tenants: Joi.string().default(""),
  gender_preference: Joi.string().default(""),
  maximum_tentants_allowed: Joi.string().default(""),
  work_preference: Joi.string().default(""),
  food_preference: Joi.string().default(""),
  expected_duration_of_stay: Joi.string().default(""),
  special_requirement: Joi.string().default(""),
  added_by_type: Joi.string()
    .valid("Owner", "Broker", "Admin")
    .default("Owner"),
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
