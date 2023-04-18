const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

exports.checkCustomerToken = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(400).json({
        error: "Token not found",
        success: false,
      });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const verifyUser = jwt.verify(token, secretKey);

    const user = await Customer.findById({ _id: verifyUser.id }).lean();
    if (!user || user?.role == 1) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      success: false,
    });
  }
};
