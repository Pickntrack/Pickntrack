const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/customer/register", AuthController.customerRegister);
router.post("/customer/login", AuthController.customerLogin);
router.post("/customer/verify-otp", AuthController.customerVerifyOtp);
router.post("/customer/resend-otp", AuthController.customerResendOtp);
router.post(
  "/customer/add-additional-information",
  AuthController.customerAddAdditionalInformation
);
router.post("/customer/verify-email", AuthController.customerVerifyEmail);
router.post(
  "/customer/register-or-login-with-socials",
  AuthController.customerRegisterOrLoginWithSocials
);

router.post("/member/register", AuthController.memberRegister);
router.post("/member/login", AuthController.memberLogin);
router.post("/member/verify-otp", AuthController.memberVerifyOtp);
router.post("/member/resend-otp", AuthController.memberResendOtp);
router.post(
  "/member/add-additional-information",
  AuthController.memberAddAdditionalInformation
);
router.post("/member/verify-email", AuthController.memberVerifyEmail);
router.post(
  "/member/register-or-login-with-socials",
  AuthController.memberRegisterOrLoginWithSocials
);

module.exports = router;
