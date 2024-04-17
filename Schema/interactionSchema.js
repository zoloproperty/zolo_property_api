const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const interactionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    unique_id: String,
    number: {
      type: String,
      require: [true, "number is required"]
    },
    name: {
      type: String,
      require: [true, "name is required"]
    },
    city: {
      type: String,
      require: [true, "city is required"]
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property"
    },
    ads: {
      type: Schema.Types.ObjectId,
      ref: "ads"
    },
    zip_code: {
      type: String,
      required: [true, "Zip code is required"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    type: {
      type: String,
      enum: ["like", "view", "unlike"]
    },
    is_converted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

interactionSchema.post("save", async function(savedDoc, next) {
  if(!savedDoc?.unique_id){
    const unique_id = (this?.property || this?.ads).toString();
    savedDoc.unique_id = unique_id;
    await savedDoc.save();
  }
  next();
});

const Interaction = mongoose.model("interaction", interactionSchema);

module.exports = Interaction;
