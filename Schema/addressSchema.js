const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
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
    city: {
      type: String,
      required: [true, "city is required"],
    },
    address: {
      type: String,
    },
    created_at: {
      type: Schema.Types.Date,
      default: new Date().getTime(),
    },
    updated_at: {
      type: Schema.Types.Date,
    },
  },
  { timestamps: true }
);

const Address = model("address", addressSchema);
module.exports = Address;
