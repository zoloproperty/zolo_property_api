const { Schema, model } = require("mongoose");

const interestedSchema = new Schema(
  {
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
    call: {
      type: Boolean,
      default: false,
    },
    leads: {
      type: Boolean,
      default: false,
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

const Interested = model("interested", interestedSchema);
module.exports = Interested;
