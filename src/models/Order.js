const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    pick_up_location: String,
    drop_location: String,
    service: String,
    house_type: String,
    pet_type: String,
    quantity: Number,
    car_type: String,
    delivery_type: String,
    status: {
      type: String,
      enum: ["COMPLETED", "ONGOING"],
      default: "ONGOING",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
