const fast2sms = require("fast-two-sms");
const apiKey = process.env.FAST_TO_SMS_API_KEY;

const sendSMS = async (phone, otp) => {
  const options = {
    authorization: apiKey,
    message: `PickNTrack: Here is your OTP ${otp}`,
    numbers: [phone],
  };
  try {
    const response = await fast2sms.sendMessage(options);
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports = sendSMS;
