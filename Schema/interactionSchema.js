const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    zip_code: {
      type: Number,
      required: [true, "Zip code is required"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    type: {
      type: String,
      enum: ["like", "view", "ads"],
    },
  },
  { timestamps: true }
);

const Interaction = mongoose.model("interaction", interactionSchema);

module.exports = Interaction;
