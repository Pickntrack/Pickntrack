const { generateOtp, createToken } = require("../helpers/functions");
const {
  customerRegisterValidation,
  customerAddAditionalInfoValidation,
  customerLoginValidation,
  customerVerifyOtpValidation,
  customerSendOtpValidation,
  memberRegisterValidation,
  memberLoginValidation,
  memberVerifyOtpValidation,
  customerRegisterOrLoginWithSocialValidation,
  memberRegisterOrLoginWithSocialValidation,
  customerVerifyEmailValidation,
} = require("../validations/authValidations");
const Customer = require("../models/Customer");
const Member = require("../models/Member");
const sendSMS = require("../service/sendSms");
const sendEmail = require("../service/sendMail");

exports.customerRegister = async (req, res) => {
  const { error } = customerRegisterValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await Customer.findOne({ phone_number }).lean();
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    await Customer.create(req.body);

    const otp = await generateOtp();

    const sendSMSResponse = await sendSMS(phone_number, otp);
    if (!sendSMSResponse.return) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    await Customer.findOneAndUpdate({ phone_number }, { otp: Number(otp) });

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

exports.customerAddAdditionalInformation = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Id is required",
    });
  }

  try {
    const user = await Customer.findById({ _id: user_id }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { error } = customerAddAditionalInfoValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const { email } = req.body;

    const otp = await generateOtp();

    const sendEmailResponse = await sendEmail(email, otp);
    if (!sendEmailResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    await Customer.findByIdAndUpdate(
      { _id: user_id },
      { email_otp: Number(otp) }
    );

    return res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.customerVerifyEmail = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Id is required",
    });
  }

  try {
    const user = await Customer.findById({ _id: user_id }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { error } = customerVerifyEmailValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const { otp } = req.body;

    if (user.email_otp !== otp) {
      return res.status(200).json({
        success: true,
        message: "Otp didn't match",
      });
    }

    await Customer.findByIdAndUpdate(
      { _id: user_id },
      { email_otp: null, is_email_verified: true }
    );

    return res.status(200).json({
      success: true,
      data: "Email verified",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.customerRegisterOrLoginWithSocials = async (req, res) => {
  const { error } = customerRegisterOrLoginWithSocialValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { token } = req.body;
  try {
    let user = await Customer.findOne({ token }).lean();
    if (!user) user = await Customer.create(req.body);

    const jsonToken = await createToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      data: jsonToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.customerLogin = async (req, res) => {
  const { error } = customerLoginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await Customer.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOtp();

    const sendSMSResponse = await sendSMS(phone_number, otp);
    if (!sendSMSResponse) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    await Customer.findOneAndUpdate({ phone_number }, { otp: Number(otp) });

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

exports.customerVerifyOtp = async (req, res) => {
  const { type } = req.query;
  if (!type) {
    return res.status(400).json({
      success: false,
      message: "Type is required",
    });
  }

  const { error } = customerVerifyOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number, otp } = req.body;
  try {
    const user = await Customer.findOne({ phone_number }).lean();
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
    await Customer.findOneAndUpdate({ phone_number }, { otp: null });

    if (type === "register") {
      return res.status(200).json({
        success: true,
        data: "OTP Verified",
      });
    } else if (type === "login") {
      const token = await createToken(user._id, user.role);
      return res.status(200).json({
        success: true,
        data: { ...user, token },
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.customerSendOtp = async (req, res) => {
  const { error } = customerSendOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await Customer.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOtp();

    const sendSMSResponse = await sendSMS(phone_number, otp);
    if (!sendSMSResponse.return) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    await Customer.findOneAndUpdate({ phone_number }, { otp: Number(otp) });
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

exports.memberRegister = async (req, res) => {
  const { error } = memberRegisterValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await Member.findOne({ phone_number }).lean();
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    await Member.create(req.body);

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

exports.memberRegisterOrLoginWithSocials = async (req, res) => {
  const { error } = memberRegisterOrLoginWithSocialValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { token } = req.body;
  try {
    let user = await Member.findOne({ token }).lean();
    if (!user) user = await Member.create(req.body);

    const jsonToken = await createToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      data: jsonToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.memberLogin = async (req, res) => {
  const { error } = memberLoginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const user = await Member.findOne({ phone_number }).lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = await generateOtp();

    const sendSMSResponse = await sendSMS(phone_number, otp);
    if (!sendSMSResponse.return) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    await Member.findOneAndUpdate({ phone_number }, { otp: Number(otp) });

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

exports.memberVerifyOtp = async (req, res) => {
  const { error } = memberVerifyOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number, otp } = req.body;
  try {
    const user = await Member.findOne({ phone_number }).lean();
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

    const token = await createToken(user._id, user.role);
    await Member.findOneAndUpdate({ phone_number }, { otp: null });
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
