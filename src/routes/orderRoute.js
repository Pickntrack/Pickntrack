const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
const { checkCustomerToken } = require("../middlewares/checkToken");

router.get("/orders", checkCustomerToken, OrderController.orders);
router.get("/order", checkCustomerToken, OrderController.order);
router.get("/types", checkCustomerToken, OrderController.types);
router.post("/make_payment", checkCustomerToken, OrderController.makePayment);

module.exports = router;
