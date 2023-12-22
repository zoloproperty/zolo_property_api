const { Schema, model } = require("mongoose");

const emiSchema = new Schema({
  limit: {
    type: Number,
    required: [true, "Emi limit is required"],
  },
  emi: {
    type: String,
    required: [true, "emi is required"],
  },
});

const Emi = model("emi", emiSchema);
module.exports = Emi;
