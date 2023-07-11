const Member = require("../models/Member");
const { updateMemberValidation } = require("../validations/memberValidations");

exports.member = async (req, res) => {
  const { id } = req.user;

  try {
    const member = await Member.findById({ _id: id }).lean();
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.members = async (req, res) => {
  try {
    const members = await Member.find({}).lean();
    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMember = async (req, res) => {
  const { id } = req.user;

  const { error } = updateMemberValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    await Member.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).json({
      success: true,
      data: "Member updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.user;

  try {
    await Member.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      data: "Member account deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
