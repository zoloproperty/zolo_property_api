const { Schema, model } = require("mongoose");

const phoneSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    number: {
      type: String,
      required: [true, "number image is required"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
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

const Phone = model("phone", phoneSchema);
module.exports = Phone;
