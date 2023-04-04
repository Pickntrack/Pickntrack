const User = require("../models/User");
const { updateUserValidation } = require("../validations/userValidations");

exports.user = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide id",
    });
  }
  try {
    const user = await User.findById({ _id: id }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide id",
    });
  }
  const { error } = updateUserValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    await User.findByIdAndUpdate({ _id: id }, req.body);
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
    await User.findByIdAndDelete({ _id: id });
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
