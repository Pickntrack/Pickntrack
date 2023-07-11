const Joi = require("joi");

exports.updateCustomerValidation = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(2).max(255),
    phone_number: Joi.string().min(10).max(10),
    email: Joi.string().email().allow(null),
    city: Joi.string().allow(null),
    pincode: Joi.number().allow(null),
    notification_settings: {
      email_updates: Joi.boolean(),
      whatsapp_updates: Joi.boolean(),
      track_updates: Joi.boolean(),
    },
  });
  return schema.validate(data);
};
