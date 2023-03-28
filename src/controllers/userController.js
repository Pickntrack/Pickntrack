const User = require("../models/User");
const Inquiry = require("../models/Inquiry");
const {
  updateUserValidation,
  createInquiryValidation,
} = require("../validations/userValidations");

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

exports.createInquiry = async (req, res) => {
  const { error } = createInquiryValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    await Inquiry.create({ ...req.body, user_id: req.user._id });
    return res.status(200).json({
      success: true,
      data: "Inquiry created",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.inquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({});
    return res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.inquiry = async (req, res) => {
  try {
    const { inquiry_id } = req.query;
    if (!inquiry_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide inquiry_id",
      });
    }

    const inquiry = await Inquiry.findById({ _id: inquiry_id });
    if (!inquiry) {
      return res.status(400).json({
        success: false,
        message: "Inquiry not found",
      });
    }
    const user = await User.findById({ _id: inquiry.user_id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        _id: inquiry._id,
        aadhar_id: inquiry.aadhar_id,
        pick_up_location: inquiry.pick_up_location,
        drop_location: inquiry.drop_location,
        service_needed: inquiry.service_needed,
        user: {
          _id: user._id,
          full_name: user.full_name,
          phone_number: user.phone_number,
          email: user?.email,
          aadhar_id: user?.aadhar_id,
          city: user?.city,
          pincode: user?.pincode,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
