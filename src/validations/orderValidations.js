const Joi = require("joi");

exports.createOrderValidation = (data) => {
  const schema = Joi.object({
    pick_up_location: Joi.string().required(),
    drop_location: Joi.string().required(),
    service: Joi.string().required(),
    house_type: Joi.string().optional(),
    pet_type: Joi.string().optional(),
    quantity: Joi.number().optional(),
    car_type: Joi.string().optional(),
    delivery_type: Joi.string().optional(),
  });
  return schema.validate(data);
};

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
