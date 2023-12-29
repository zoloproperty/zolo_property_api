const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  brand: {
    type: String,
    required: [true, "Brand name is required"],
  },
  image: {
    type: String,
    required: [true, "Brand image is required"],
  },
  description: {
    type: String,
    required: [true, "Brand description is required"],
  },
  isActive:{
    type: Boolean,
    default: true,
  },
  isDeleted:{
    type: Boolean,
    default: false,
  },
},
{ timestamps: true });

const Brand = model("brand", brandSchema);
module.exports = Brand;
