const jwt = require("jsonwebtoken");

exports.generateOtp = async () => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  return OTP;
};

exports.createToken = async (userId, role) => {
  console.log(userId, role);
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET_KEY
  );
};
