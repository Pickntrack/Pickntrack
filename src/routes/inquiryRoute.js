const express = require("express");
const router = express.Router();

const InquiryController = require("../controllers/inquiryController");
const { checkUserToken } = require("../middlewares/checkUserToken");

router.post("/create-inquiry", checkUserToken, InquiryController.createInquiry);
router.get("/inquiries", checkUserToken, InquiryController.inquiries);
router.get("/inquiry", checkUserToken, InquiryController.inquiry);

module.exports = router;
