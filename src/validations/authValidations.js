const Joi = require("joi");

exports.registerValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(2).max(255).required(),
    phone_number: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().allow(null),
    aadhar_id: Joi.string().length(12).allow(null),
    city: Joi.string().allow(null),
    pincode: Joi.number().allow(null),
  });
  return schema.validate(data);
};

exports.loginValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};

exports.verifyOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
    otp: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.sendOtpValidation = (data) => {
  const schema = Joi.object({
    phone_number: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
};
