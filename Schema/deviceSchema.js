const { Schema, model } = require("mongoose");

const deviceSchema = new Schema(
  {
    unique_id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    deviceId: {
      type: String,
      required: [true, "name is required"],
    },
    is_active: {
      type: Boolean,
      default: true,
    }
   
  },
  { timestamps: true }
);

const Device = model("device", deviceSchema);
module.exports = Device;
