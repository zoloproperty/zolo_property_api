const { Schema, model } = require("mongoose");

const interestedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    zip_code: {
      type: Number,
      required: [true, "Zip code is required"],
    },
    call: {
      type: Boolean,
      default: false,
    },
    leads: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "name is required"],
    },
    type: {
      type: String,
      enum: ["ads", "property"],
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
