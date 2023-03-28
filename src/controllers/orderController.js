const Order = require("../models/Order");
const Type = require("../models/Type");
const {
  createOrderValidation,
  orderValidation,
  ordersValidation,
} = require("../validations/orderValidations");

exports.createOrder = async (req, res) => {
  try {
    const { error } = createOrderValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    await Order.create(req.body);
    return res.status(200).json({
      success: true,
      data: "Order Create",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.orders = async (req, res) => {
  try {
    const { error } = ordersValidation(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const ongoingOrders = await Order.find({ status: "ONGOING" });
    const completedOrders = await Order.find({ status: "COMPLETED" });

    return res.status(200).json({
      success: true,
      data: {
        ongoing: ongoingOrders,
        complted: completedOrders,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.order = async (req, res) => {
  try {
    const { error } = orderValidation(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const { id } = req.query;

    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(400).json({
        success: false,
        data: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.types = async (req, res) => {
  try {
    const { type } = req.query;
    const types = await Type.find({}).select(type);
    return res.status(200).json({
      success: true,
      data: types,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
