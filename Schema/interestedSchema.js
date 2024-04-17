const { Schema, model } = require("mongoose");

const interestedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    unique_id:String,
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



interestedSchema.post("save", async function(savedDoc, next) {
  if(!savedDoc?.unique_id){
    const unique_id = (this?.property || this?.ads).toString();
    savedDoc.unique_id = unique_id;
    await savedDoc.save();
  }
  next();
});

const Interested = model("interested", interestedSchema);
module.exports = Interested;
