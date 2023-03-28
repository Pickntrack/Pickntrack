const Joi = require("joi");

exports.updateUserValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(2).max(255).required(),
    phone_number: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().allow(null),
    city: Joi.string().allow(null),
    pincode: Joi.number().allow(null),
  });
  return schema.validate(data);
};

exports.createInquiryValidation = (data) => {
  const schema = Joi.object({
    aadhar_id: Joi.string().required(),
    pick_up_location: Joi.string().required(),
    drop_location: Joi.string().required(),
    service_needed: Joi.string().required(),
    service_needed: Joi.string().required(),
  });
  return schema.validate(data);
};
