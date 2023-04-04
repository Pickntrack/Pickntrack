const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
const { checkUserToken } = require("../middlewares/checkUserToken");

router.get("/orders", checkUserToken, OrderController.orders);
router.get("/order", checkUserToken, OrderController.order);
router.get("/types", checkUserToken, OrderController.types);

module.exports = router;
