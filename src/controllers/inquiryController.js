const Inquiry = require("../models/Inquiry");
const Customer = require("../models/Customer");
const {
  createInquiryValidation,
} = require("../validations/InquiryValidations");

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
    const customer = await Customer.findById({ _id: inquiry.user_id });
    if (!customer) {
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
        whatsapp_updates: inquiry.whatsapp_updates,
        items: inquiry.items,
        user: {
          _id: customer._id,
          full_name: customer.full_name,
          phone_number: customer.phone_number,
          email: customer?.email,
          aadhar_id: customer?.aadhar_id,
          city: customer?.city,
          pincode: customer?.pincode,
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
