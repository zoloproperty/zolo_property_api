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
  created_at: {
    type: Schema.Types.Date,
    default: new Date().getTime(),
  },
  updated_at: {
    type: Schema.Types.Date,
  },
},
{ timestamps: true });

const Emi = model("emi", emiSchema);
module.exports = Emi;
