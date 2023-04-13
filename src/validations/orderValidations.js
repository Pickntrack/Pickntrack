const Joi = require("joi");

exports.ordersValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().valid("COMPLETED", "ONGOING"),
  });
  return schema.validate(data);
};

exports.orderValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.makePaymentValidation = (data) => {
  const schema = Joi.object({
    to: Joi.string().required(),
    order_id: Joi.string().required(),
    amount: Joi.string().required(),
  });
  return schema.validate(data);
};
