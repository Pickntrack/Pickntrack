const Joi = require("joi");

exports.registerValidation = (data) => {
  const RegisterSchema = Joi.object({
    full_name: Joi.string().min(2).max(255).required(),
    phone_number: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().allow(null),
    aadhar_id: Joi.string().length(12).allow(null),
    city: Joi.string().allow(null),
    pincode: Joi.number().allow(null),
  });
  return RegisterSchema.validate(data);
};

exports.loginValidation = (data) => {
  const LoginSchema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return LoginSchema.validate(data);
};

exports.verifyOtpValidation = (data) => {
  const VerifyOtpSchema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
    otp: Joi.number().required(),
  });
  return VerifyOtpSchema.validate(data);
};

exports.sendOtpValidation = (data) => {
  const SendOtpSchema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return SendOtpSchema.validate(data);
};
