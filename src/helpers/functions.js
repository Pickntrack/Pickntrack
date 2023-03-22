const jwt = require("jsonwebtoken");

exports.generateOtp = async () => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  return OTP;
};

exports.createToken = async (userId) => {
  return jwt.sign(
    {
      data: userId,
    },
    "PICKNTRACKAPP"
  );
};
