const { Schema, model } = require("mongoose");

const modalSchema = new Schema(
  {
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

const Modal = model("modal", modalSchema);
module.exports = Modal;
