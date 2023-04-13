const Customer = require("../models/Customer");
const {
  updateUserValidation,
  updateCustomerValidation,
} = require("../validations/customerValidations");

exports.customer = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide id",
    });
  }
  try {
    const customer = await Customer.findById({ _id: id }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "User not found",
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
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide id",
    });
  }
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
      data: "User updated",
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
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide id",
    });
  }

  try {
    await Customer.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      data: "Account deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
