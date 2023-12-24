const { Schema, model } = require("mongoose");

const emiSchema = new Schema({
  limit: {
    type: Number,
    required: [true, "Emi limit is required"],
  },
  emi: {
    type: Number,
    required: [true, "emi is required"],
  },
},
{ timestamps: true });

const Emi = model("emi", emiSchema);
module.exports = Emi;
