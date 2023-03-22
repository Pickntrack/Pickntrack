const User = require("../models/User");
const { generateOtp, createToken } = require("../helpers/functions");
const {
  registerValidation,
  loginValidation,
  verifyOtpValidation,
  sendOtpValidation,
} = require("../validations/authValidations");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    await User.create(req.body);

    return res.status(200).json({
      success: true,
      data: "Record inserted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.registerWithSocials = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (!user) await User.create(req.body);

    const otp = await generateOtp();

    await User.findOneAndUpdate({ phone_number }, { otp: otp });

    return res.status(200).json({
      success: true,
      data: "Otp sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOtp();

    await User.findOneAndUpdate({ phone_number }, { otp: otp });

    return res.status(200).json({
      success: true,
      data: "Otp sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginWithSocials = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (!user) await User.create(req.body);

    const otp = await generateOtp();

    await User.findOneAndUpdate({ phone_number }, { otp });

    return res.status(200).json({
      success: true,
      data: "Otp sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { error } = verifyOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number, otp } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(200).json({
        success: true,
        message: "Otp didn't match",
      });
    }

    const token = await createToken(user.id);
    await User.findOneAndUpdate({ phone_number }, { otp: null });
    return res.status(200).json({
      success: true,
      data: { ...user, token },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sendOtp = async (req, res) => {
  const { error } = sendOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOtp();
    await User.findOneAndUpdate({ phone_number }, { otp: otp });
    return res.status(200).json({
      success: true,
      data: "Otp sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
