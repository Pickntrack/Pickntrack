const express = require("express");
const router = express.Router();

const Webhook = require("../webhook/payment");

router.post("/razorpay-incoming-webhook", Webhook.paymentWebhook);

module.exports = router;
