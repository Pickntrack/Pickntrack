const Joi = require("joi");

exports.customerRegisterValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.customerLoginValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.customerVerifyOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
    otp: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.customerResendOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.customerAddAditionalInfoValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    aadhar_id: Joi.string().length(12).required(),
    city: Joi.string().required(),
    pincode: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.customerVerifyEmailValidation = (data) => {
  const schema = Joi.object({
    otp: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.customerRegisterOrLoginWithSocialValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    token: Joi.string().required(),
    registration_type: Joi.string().required().valid("GOOGLE", "FACEBOOK"),
    full_name: Joi.string().required(),
    email: Joi.string().email().allow(null),
  });
  return schema.validate(data);
};

exports.memberRegisterValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.memberLoginValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.memberVerifyOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
    otp: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.memberResendOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.memberAddAditionalInfoValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    company_name: Joi.string().required(),
    gst_number: Joi.string().required(),
    service_provided: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.memberVerifyEmailValidation = (data) => {
  const schema = Joi.object({
    otp: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.memberRegisterOrLoginWithSocialValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    token: Joi.string().required(),
    registration_type: Joi.string().required().valid("GOOGLE", "FACEBOOK"),
    full_name: Joi.string().required(),
    email: Joi.string().email().allow(null),
  });
  return schema.validate(data);
};
