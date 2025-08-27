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
    is_send: { type: Boolean, default: false }, // Indicates if notification was sent
    messageId: { type: String }, // Firebase message ID
    error: { type: String }, // Error message if sending failed

  },
  { timestamps: true }
);

const Notification = model("notification", notificationSchema);
module.exports = Notification;
