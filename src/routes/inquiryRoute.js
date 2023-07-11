const express = require("express");
const router = express.Router();

const InquiryController = require("../controllers/inquiryController");
const { checkCustomerToken } = require("../middlewares/checkTokens");

router.post(
  "/customer/create-inquiry",
  checkCustomerToken,
  InquiryController.createInquiry
);
router.get(
  "/customer/inquiries",
  checkCustomerToken,
  InquiryController.inquiriesOfCustomer
);
router.get("/inquiry", checkCustomerToken, InquiryController.inquiry);

module.exports = router;
