const { Schema, model } = require("mongoose");

const interestedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    number: {
      type: String,
      required: [true, "number is required"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    ads: {
      type: Schema.Types.ObjectId,
      ref: "ads",
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    zip_code: {
      type: String,
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
    note: {
      type: String,
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
