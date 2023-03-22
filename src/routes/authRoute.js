const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/register", AuthController.register);
router.post("/register-with-socials", AuthController.registerWithSocials);
router.post("/login", AuthController.login);
router.post("/login-with-socials", AuthController.loginWithSocials);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/send-otp", AuthController.sendOtp);

module.exports = router;
