const Joi = require("joi");

exports.createInquiryValidation = (data) => {
  const schema = Joi.object({
    date: Joi.date().required().greater(new Date()),
    pick_up_location: Joi.string().required(),
    drop_location: Joi.string().required(),
    service_needed: Joi.string()
      .required()
      .valid(
        "Local Move",
        "Domestic Move",
        "International Move",
        "Pet Relocation",
        "Car Transpotation",
        "Storage & Warehouse"
      ),
    house_type: Joi.when("service_needed", {
      is: Joi.string().valid("Local Move", "Domestic Move"),
      then: Joi.string().required(),
    }),
    pet_type: Joi.when("service_needed", {
      is: Joi.string().valid("Pet Relocation"),
      then: Joi.string()
        .required()
        .valid("Dog", "Cat", "Bird", "Fish", "Hamster", "Other"),
    }),
    quantity: Joi.when("service_needed", {
      is: Joi.string().valid("Pet Relocation"),
      then: Joi.number().required(),
    }),
    car_type: Joi.when("service_needed", {
      is: Joi.string().valid("Car Transpotation"),
      then: Joi.number()
        .required()
        .valid(
          "Hatchback",
          "Sedan",
          "SUV",
          "MUV",
          "Convertibles",
          "Coupe",
          "2-wheeler",
          "Luxury Car"
        ),
    }),
    delivery_type: Joi.when("service_needed", {
      is: Joi.string().valid("Car Transpotation"),
      then: Joi.number()
        .required()
        .valid("Exclusive Container", "Shared Container", "Drive-N-Deliver"),
    }),
    whatsapp_updates: Joi.boolean().required(),
  });
  return schema.validate(data);
};
