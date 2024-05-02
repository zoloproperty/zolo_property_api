const { Schema, model } = require("mongoose");
const path = require("path");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "editor","broker"],
    },
    image: { type: String },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    local_area: [{ type: Number }],
    address: {
      type: String,                               
    },
    login_type: {
      type: String,
      enum: ["", "credential"],
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    email_verify_tokan: String,
    reset_pass_tokan: String,
    reset_pass_expiry: String,
  },
  { timestamps: true }
);

userSchema.virtual("url").get(function () {
  if (this.image) {
    const hostUrl = "http://192.168.1.5:5000" || process.env.HostURL.replace(/\\/g, "/"); // Replace backslashes with forward slashes
    const newPath = this.image.replace(/\\/g, "/").replace(/^public\//, ''); // Remove "public" segment from the path
    return `${hostUrl}/${newPath}`; // Combine hostUrl and newPath using forward slashes
  }
  return "http://localhost:5000/default/profile.png";
});

// Use toJSON option to include virtuals when converting the document to JSON
userSchema.set("toJSON", { virtuals: true });

const User = model("user", userSchema);
module.exports = User;
