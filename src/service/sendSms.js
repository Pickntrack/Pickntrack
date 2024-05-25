const fast2sms = require("fast-two-sms");
const apiKey = 'iKM8ygkqlnNHcxw3d2r4RW60IsD1QoXJOFE95ZSeA7bVahUjTLR8L21mv3iBsOIoTcUk9qldx5hPgGNV'

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
