const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const interactionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    number: {
      type: String,
      require: [true, "number is required"],
    },
    name: {
      type: String,
      require: [true, "name is required"],
    },
    city: {
      type: String,
      require: [true, "city is required"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    ads: {
      type: Schema.Types.ObjectId,
      ref: "ads",
    },
    zip_code: {
      type: String,
      required: [true, "Zip code is required"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    type: {
      type: String,
      enum: ["like", "view"],
    },
  },
  { timestamps: true }
);

const Interaction = mongoose.model("interaction", interactionSchema);

module.exports = Interaction;
