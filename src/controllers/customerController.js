const Customer = require("../models/Customer");
const {
  updateCustomerValidation,
} = require("../validations/customerValidations");

exports.customer = async (req, res) => {
  const { id } = req.query;

  try {
    const customer = await Customer.findById({ _id: id }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.user;

  const { error } = updateCustomerValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    await Customer.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).json({
      success: true,
      data: "Customer updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.query;

  try {
    await Customer.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      data: "Customer account deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
