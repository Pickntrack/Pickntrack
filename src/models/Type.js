const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema(
  {
    house_type: Array,
    pet_type: Array,
    car_type: Array,
    delivery_type: Array,
    house_type: Array,
  },
  {
    timestamps: true,
  }
);

const Type = mongoose.model("Types", TypeSchema);

module.exports = Type;
