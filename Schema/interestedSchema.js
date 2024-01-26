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
    is_fake: {
      type: Boolean,
      default: false,
    },
    email_sent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    type: {
      type: String,
      enum: ["ads", "property"],
    },
    status: {
      type: String,
      default: "interested",
      enum: ["contacted", "interested", "follow-up", "not-interested"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Interested = model("interested", interestedSchema);
module.exports = Interested;
