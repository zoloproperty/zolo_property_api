const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    sent: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Notification = model("notification", notificationSchema);
module.exports = Notification;
