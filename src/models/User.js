const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: String,
    phone_number: String,
    email: String,
    aadhar_id: String,
    city: String,
    pincode: Number,
    otp: Number,
    role: { type: Number, default: 1 },
    notification_settings: {
      email_updates: {
        type: Boolean,
        default: true,
      },
      whatsapp_updates: {
        type: Boolean,
        default: true,
      },
      track_updates: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
