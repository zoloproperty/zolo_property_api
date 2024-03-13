const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    zip_code: {
      type: Number,
      required: [true, "Zip code is required"],
    },
    address: {
      type: String,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
    },
    show_verified: {
      type: Boolean,
      default: false,
    },
    property_for: {
      type: String,
      enum: ["sell", "rent", "sold"],
      require: [true, "property for require"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    location: { type: String, required: true },
    property_type: {
      type: String,
      enum: [
        "Shop",
        "Plot",
        "Office",
        "Apartments",
        "House",
        "Villa",
        "Hostel",
        "Pg",
        "Farm",
      ],
      default: "House",
    },
    saleable_area: { type: String },
    carpet_area: { type: String },
    saleable_area_size_in: {
      type: String,
      enum: ["Feet", "Meters", "Yards", "Bigha", "Acres", "Hectares"],
      default: "Feet",
    },
    carpet_area_size_in: {
      type: String,
      enum: ["Feet", "Meters", "Yards"],
      default: "Feet",
    },
    additional_room: [{ type: String }],
    expected_price: { type: Number, default: 0 },
    expected_price_in_sqft: { type: Number, default: 0 },
    negotiable: { type: Boolean, default: true },
    booking_price: { type: Number, default: 0 },
    monthly_rent: { type: Number, default: 0 },
    security_deposit: { type: String, default: 0 },
    maintance_charge: { type: Number, default: 0 },
    available_from: { type: Date },
    property_description: { type: String },
    open_side: { type: String, enum: ["0", "1", "2", "3", "4"], default: "0" },
    facing_side: {
      type: String,
      enum: [
        "North",
        "South",
        "West",
        "East",
        "Northeast",
        "Northwest",
        "Southwest",
        "Southeast",
        "",
      ],
    },
    facing_road_width: { type: String },
    facing_road_width_in: {
      type: String,
      enum: ["Feet", "Meters"],
      default: "Feet",
    },
    images: [{ type: String }],
    banner: { type: String },
    video: { type: String },
    room_data: [
      {
        room_type: { type: String },
        no_of_rooms: { type: Number },
        price: {
          type: String,
        },
      },
    ],
    bedrooms: { type: String },
    bathrooms: { type: Number },
    balconies: { type: Number },
    additional_facility: [{ type: String }],
    property_status: {
      type: String,
      enum: ["Ready_to_shift", "Underconstruction"],
      default: "Ready_to_shift",
    },
    property_age: { type: String },
    possession_date: { type: Date },
    description: { type: String },
    furnishing_status: {
      type: String,
      enum: ["", "Unfurnished", "Semi_furnished", "Fully_furnished"],
    },
    wardrobe: { type: Number },
    beds: { type: Number },
    ac: { type: Number },
    tv: { type: Number },
    light: { type: String },
    fan: { type: String },
    exhaust_fan: { type: String },
    boundary_wall: { type: String },
    additional_furnishing: [{ type: String }],
    other_facility: { type: String },
    car_parking_open: { type: Number },
    car_parking_close: { type: Number },
    floor: { type: Number },
    total_floor: { type: Number },
    overlooking: [{ type: String }],
    ownership_type: {
      type: String,
      enum: [
        "Freehold",
        "Power_of_attorney",
        "leasehold",
        "Co_Operative_Society",
      ],
      default: "Freehold",
    },
    living_room: { type: String },
    kitchen: { type: String },
    master_bedroom: { type: String },
    bathroom: { type: String },
    balcony: { type: String },
    other_bedroom: { type: String },
    preferred_tenants: { type: String },
    gender_preference: { type: String },
    maximum_tentants_allowed: { type: String },
    work_preference: { type: String },
    food_preference: { type: String },
    expected_duration_of_stay: { type: String },
    special_requirement: { type: String },
    added_by_type: {
      type: String,
      enum: ["Owner", "Broker", "Admin"],
      default: "Owner",
    },
    views: { type: Number, default: 1 },
    admin_status: {
      type: String,
      enum: ["Pending", "Reject", "Approved"],
      default: "Pending",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

propertySchema.virtual("imageUrls").get(function () {
  return this.images.map((image) => {
    const hostUrl = process.env.HostURL.replace(/\\/g, "/");
    const newPath = image.replace(/\\/g, "/").replace(/^public\//, "");
    if (newPath) {
      return `${hostUrl}/${newPath}`;
    } else {
      return "";
    }
  });
});

propertySchema.virtual("videoUrl").get(function () {
  const hostUrl = process.env.HostURL.replace(/\\/g, "/");
  const newPath = (this.video || "")
    .replace(/\\/g, "/")
    .replace(/^public\//, "");
  if (newPath) {
    return `${hostUrl}/${newPath}`;
  } else {
    return "";
  }
});

propertySchema.virtual("bannerUrl").get(function () {
  const hostUrl = process.env.HostURL.replace(/\\/g, "/");
  const newPath = (this.banner || "")
    .replace(/\\/g, "/")
    .replace(/^public\//, "");
  if (newPath) {
    return `${hostUrl}/${newPath}`;
  } else {
    return "";
  }
});

propertySchema.set("toJSON", { virtuals: true });

const Property = model("property", propertySchema);
module.exports = Property;
