const { Schema, model } = require("mongoose");

const emiSchema = new Schema(
  {
    limit: {
      type: Number,
      required: [true, "Emi limit is required"],
    },
    emi: {
      type: Number,
      required: [true, "emi is required"],
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

const Emi = model("emi", emiSchema);
module.exports = Emi;
