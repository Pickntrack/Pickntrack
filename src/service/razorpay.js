const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const createOrder = (amount) => {
  return new Promise((resolve, reject) => {
    const orderData = {
      amount: amount * 1000,
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture: 1,
    };

    razorpay.orders.create(orderData, function (error, order) {
      if (error) {
        console.log("Error creating order:", error);
        reject({
          success: false,
          message: error.message,
        });
      }

      const options = {
        key: "YOUR_KEY_ID",
        amount: order.amount,
        currency: order.currency,
        name: "Pick N Track",
        description: "Your Product Description",
        image: "https://your-company-logo-url.com/logo.png",
        order_id: order.id,
        prefill: {
          name: "Your Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      resolve({
        success: true,
        data: options,
      });
    });
  });
};

module.exports = { createOrder };
