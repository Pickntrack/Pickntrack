const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/customer/register", AuthController.customerRegister);
router.post(
  "/customer/add-additional-information",
  AuthController.customerAddAdditionalInformation
);

router.post("/customer/verify-email", AuthController.customerVerifyEmail);

router.post(
  "/customer/register-or-login-with-socials",
  AuthController.customerRegisterOrLoginWithSocials
);
router.post("/customer/login", AuthController.customerLogin);

router.post("/customer/verify-otp", AuthController.customerVerifyOtp);
router.post("/customer/send-otp", AuthController.customerSendOtp);

router.post("/member/register", AuthController.memberRegister);
router.post(
  "/member/register-or-login-with-socials",
  AuthController.memberRegisterOrLoginWithSocials
);
router.post("/member/login", AuthController.memberLogin);
router.post("/member/verify-otp", AuthController.memberVerifyOtp);

module.exports = router;
