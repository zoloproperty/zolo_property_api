const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    property_id: {
      type: String,
      required: [true, "Property ID is required"],
    },
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
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "interested",
      enum: ["contacted", "interested", "follow-up", "not-interested"],
    },
    isFake: {
      type: Boolean,
      default: false,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);
module.exports = Contact;
