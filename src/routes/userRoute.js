const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const { checkUserToken } = require("../middlewares/checkUserToken");

router.get("/get-user", checkUserToken, UserController.user);
router.post("/update-user", checkUserToken, UserController.updateUser);
router.post("/delete-account", checkUserToken, UserController.deleteAccount);
router.post("/create-inquiry", checkUserToken, UserController.createInquiry);
router.get("/inquiries", checkUserToken, UserController.inquiries);
router.get("/inquiry", checkUserToken, UserController.inquiry);

module.exports = router;