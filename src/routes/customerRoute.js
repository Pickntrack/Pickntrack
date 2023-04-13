const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customerController");
const { checkCustomerToken } = require("../middlewares/checkToken");

router.get("/customer", checkCustomerToken, CustomerController.customer);
router.post(
  "/update-customer",
  checkCustomerToken,
  CustomerController.updateCustomer
);
router.post(
  "/delete-account",
  checkCustomerToken,
  CustomerController.deleteAccount
);

module.exports = router;
