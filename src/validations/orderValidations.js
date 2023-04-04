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
