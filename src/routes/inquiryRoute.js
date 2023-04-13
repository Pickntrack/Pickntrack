const express = require("express");
const router = express.Router();

const InquiryController = require("../controllers/inquiryController");
const { checkCustomerToken } = require("../middlewares/checkToken");

router.post(
  "/create-inquiry",
  checkCustomerToken,
  InquiryController.createInquiry
);
router.get("/inquiries", checkCustomerToken, InquiryController.inquiries);
router.get("/inquiry", checkCustomerToken, InquiryController.inquiry);

module.exports = router;
