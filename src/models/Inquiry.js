const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InquirySchema = new Schema(
  {
    aadhar_id: String,
    pick_up_location: String,
    drop_location: String,
    service_needed: String,
    user_id: String,
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);

module.exports = Inquiry;
