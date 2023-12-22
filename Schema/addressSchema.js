const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
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
});


const Address = model("address", addressSchema);
module.exports = Address;