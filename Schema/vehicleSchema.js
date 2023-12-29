const { Schema, model } = require("mongoose");

const vehicleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product_type: {
      type: String,
      default: "car",
      enum: ["car", "bike"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    modal: {
      type: Schema.Types.ObjectId,
      ref: "modal",
      required: true,
    },
    purchase_year: {
      type: String,
      required: [true, "Purchase year is required"],
    },
    fuel_type: {
      type: String,
      required: [true, "Fuel type is required"],
    },
    mileage: {
      type: String,
    },
    km_run: {
      type: String,
      required: [true, "KM run is required"],
    },
    onnership: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 7, 8],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    image: {
      type: [String],
    },
    video: {
      type: [String],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    address: {
      type: String,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
    },
    showVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vehicle = model("vehicle", vehicleSchema);
module.exports = Vehicle;
