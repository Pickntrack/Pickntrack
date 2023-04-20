const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    id: String,
    token: String,
    full_name: String,
    phone_number: String,
    email: String,
    company_name: String,
    gst_number: String,
    service_provided: String,
    city: String,
    pincode: Number,
    otp: Number,
    email_otp: Number,
    is_email_verified: { type: Boolean, default: false },
    role: { type: Number, default: 2 },
    registration_type: {
      type: String,
      default: "NORMAL",
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
