const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customerController");
const { checkCustomerToken } = require("../middlewares/checkTokens");

router.get("/customer", checkCustomerToken, CustomerController.customer);
router.post(
  "/customer/update-customer",
  checkCustomerToken,
  CustomerController.updateCustomer
);
router.post(
  "/customer/delete-account",
  checkCustomerToken,
  CustomerController.deleteAccount
);

module.exports = router;
