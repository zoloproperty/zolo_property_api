const { Schema, model } = require("mongoose");

const phoneSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    number: {
      type: String,
      required: [true, "number is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  { timestamps: true }
);

const Phone = model("phone", phoneSchema);
module.exports = Phone;
