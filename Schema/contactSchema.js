const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    contact_number: {
      type: String,
      unique: [true , 'Contact value already exists, please try another value.'],
      required: [true, "Contact number is required"],
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

const Contact = model("Contact", contactSchema);
module.exports = Contact;
