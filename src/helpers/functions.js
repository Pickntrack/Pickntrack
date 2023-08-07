const jwt = require("jsonwebtoken");

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
    process.env.JWT_SECRET_KEY
  );
};
