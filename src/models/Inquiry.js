const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InquirySchema = new Schema(
  {
    date: Date,
    pick_up_location: String,
    drop_location: String,
    service_needed: String,
    house_type: String,
    pet_type: String,
    quantity: Number,
    car_type: String,
    delivery_type: String,
    user_id: String,
    whatsapp_updates: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);

module.exports = Inquiry;
