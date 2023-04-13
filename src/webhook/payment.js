const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.paymentWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  try {
    razorpay.webhooks.verify(req.body, signature, function (error, data) {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        console.log("Webhook Event:", data);
        return res.status(200).json({
          success: true,
          data: "",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
