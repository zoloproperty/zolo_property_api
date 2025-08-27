const { Schema, model } = require("mongoose");

const deviceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    deviceId: {
      type: String,
      required: [true, "deviceId is required"],
      required: true
    },
    name: {
      type: String,
      required: [true, "name is required"],
      required: true
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
