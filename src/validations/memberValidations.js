const Joi = require("joi");

exports.updateMemberValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(2).max(255).allow(null),
    phone_number: Joi.string().min(10).max(10).allow(null),
    email: Joi.string().email().allow(null),
    company_name: Joi.string().allow(null),
    gst_number: Joi.string().allow(null),
    city: Joi.string().allow(null),
    pincode: Joi.number().allow(null),
  });
  return schema.validate(data);
};
