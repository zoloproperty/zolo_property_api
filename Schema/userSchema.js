const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  is_active: { type: String, enum: ["ACTIVE", "INACTIVE"] },
  auth_token: { type: String },
  created_at: { type: Schema.Types.Date, default: new Date().getTime() },
  updated_at: { type: Schema.Types.Date },
});

const User = model("user", userSchema);
module.exports = User;
