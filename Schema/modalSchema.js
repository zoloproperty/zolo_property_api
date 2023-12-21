const { Schema, model } = require("mongoose");

const modalSchema = new Schema({
  brand: {
    type: Schema.Types.ObjectId,
    ref: "brand",
    required: [true, "Brand name is required"],
  },
  modal: {
    type: String,
    required: [true, "Modal name is required"],
  },
  image: {
    type: String,
    required: [true, "Modal image is required"],
  },
  description: {
    type: String,
    required: [true, "Modal description is required"],
  },
});

const Modal = model("modal", modalSchema);
module.exports = Modal;
