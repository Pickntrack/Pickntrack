const Type = require("../models/Type");
const {
  orderValidation,
  ordersValidation,
  makePaymentValidation,
} = require("../validations/orderValidations");
const { createOrder } = require("../service/razorpay");

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

exports.makePayment = async (req, res) => {
  try {
    const { error } = makePaymentValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    // const order = await Order.findByID({ _id: req.body.order_id });
    // if (!order) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Order Not found",
    //   });
    // }

    // if (order.payment_status === "RECEIVED") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Payment already done",
    //   });
    // }

    const createOrderResponse = await createOrder(req.body.amount);
    if (!createOrderResponse.success) {
      return res.status(400).json({
        success: false,
        message: createOrderResponse.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, data: createOrderResponse.data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
