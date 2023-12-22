const { Schema, model } = require("mongoose");

const interestedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "vehicle",
    required: true,
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
{ timestamps: true });

const Interested = model("interested", interestedSchema);
module.exports = Interested;
