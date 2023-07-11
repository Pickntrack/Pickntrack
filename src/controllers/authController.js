const { generateOtp, createToken } = require("../helpers/functions");
const {
  customerRegisterValidation,
  customerAddAditionalInfoValidation,
  customerLoginValidation,
  customerVerifyOtpValidation,
  memberRegisterValidation,
  memberLoginValidation,
  memberVerifyOtpValidation,
  customerRegisterOrLoginWithSocialValidation,
  memberRegisterOrLoginWithSocialValidation,
  customerVerifyEmailValidation,
  memberAddAditionalInfoValidation,
  memberVerifyEmailValidation,
  customerResendOtpValidation,
  memberResendOtpValidation,
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
    const customer = await Customer.findOne({ phone_number }).lean();
    if (customer) {
      return res.status(400).json({
        success: false,
        message: "Customer already exist",
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
    const customer = await Customer.findOne({ phone_number }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
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
    const customer = await Customer.findOne({ phone_number }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }

    if (customer.otp !== otp) {
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
      const token = await createToken(customer._id, customer.role);
      return res.status(200).json({
        success: true,
        data: { ...customer, token },
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.customerResendOtp = async (req, res) => {
  const { error } = customerResendOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const customer = await Customer.findOne({ phone_number }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
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

exports.customerAddAdditionalInformation = async (req, res) => {
  const { customer_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({
      success: false,
      message: "customer_id is required",
    });
  }

  try {
    const customer = await Customer.findById({ _id: customer_id }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
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
      { _id: customer_id },
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
  const { customer_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({
      success: false,
      message: "customer_id is required",
    });
  }

  try {
    const customer = await Customer.findById({ _id: customer_id }).lean();
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
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

    if (customer.email_otp !== otp) {
      return res.status(200).json({
        success: true,
        message: "Otp didn't match",
      });
    }

    await Customer.findByIdAndUpdate(
      { _id: customer_id },
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
    let customer = await Customer.findOne({ token }).lean();
    if (!customer) customer = await Customer.create(req.body);

    const jsonToken = await createToken(customer._id, customer.role);

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
    const member = await Member.findOne({ phone_number }).lean();
    if (member) {
      return res.status(400).json({
        success: false,
        message: "Member already exist",
      });
    }

    await Member.create(req.body);

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
    const member = await Member.findOne({ phone_number }).lean();
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
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
  const { type } = req.query;
  if (!type) {
    return res.status(400).json({
      success: false,
      message: "Type is required",
    });
  }

  const { error } = memberVerifyOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number, otp } = req.body;
  try {
    const member = await Member.findOne({ phone_number }).lean();
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
      });
    }

    if (member.otp !== otp) {
      return res.status(200).json({
        success: true,
        message: "Otp didn't match",
      });
    }

    await Member.findOneAndUpdate({ phone_number }, { otp: null });

    if (type === "register") {
      return res.status(200).json({
        success: true,
        data: "OTP Verified",
      });
    } else if (type === "login") {
      const token = await createToken(member._id, member.role);
      return res.status(200).json({
        success: true,
        data: { ...member, token },
      });
    }

    return res.status(200).json({
      success: true,
      data: { ...member, token },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.memberResendOtp = async (req, res) => {
  const { error } = memberResendOtpValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const { phone_number } = req.body;
  try {
    const member = await Member.findOne({ phone_number }).lean();
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
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

exports.memberAddAdditionalInformation = async (req, res) => {
  const { member_id } = req.query;

  if (!member_id) {
    return res.status(400).json({
      success: false,
      message: "member_id is required",
    });
  }

  try {
    const member = await Member.findById({ _id: member_id }).lean();
    if (!member) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
      });
    }

    const { error } = memberAddAditionalInfoValidation(req.body);
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

    await Member.findByIdAndUpdate(
      { _id: member_id },
      { email_otp: Number(otp), ...req.body }
    );

    return res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.memberVerifyEmail = async (req, res) => {
  const { member_id } = req.query;

  if (!member_id) {
    return res.status(400).json({
      success: false,
      message: "member_id is required",
    });
  }

  try {
    const member = await Member.findById({ _id: member_id }).lean();
    if (!member_id) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
      });
    }

    const { error } = memberVerifyEmailValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const { otp } = req.body;

    if (member.email_otp !== otp) {
      return res.status(200).json({
        success: true,
        message: "Otp didn't match",
      });
    }

    await Member.findByIdAndUpdate(
      { _id: member_id },
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
    let member = await Member.findOne({ token }).lean();
    if (!member) member = await Member.create(req.body);

    const jsonToken = await createToken(member._id, member.role);

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
