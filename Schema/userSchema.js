const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    last_name: {
      type: String,
    },
    number: {
      type: Number,
      required: [true, "Number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "editor"],
    },
    interest: {
      type: String,
      default: "car",
      enum: ["car", "bike"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    address: {
      type: String,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    email_verify_tokan: String,
    reset_pass_tokan: String,
    reset_pass_expiry: String,
  },
  { timestamps: true }
);

const User = model("user", userSchema);
module.exports = User;
