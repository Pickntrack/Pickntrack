const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret_is_secret"
exports.generateOtp = async () => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  return OTP;
};
exports.createToken = async (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    JWT_SECRET_KEY
  );
};
