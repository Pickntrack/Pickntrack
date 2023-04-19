const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, otp) => {
  const template = `<p>Hello There,</p>
                    <p>Please verify your email address.<br/>
                    Use this OTP to verify ${otp}.
                    <br/>
                    Thanks
                    <br/>
                    <br/>
                    Team Pick N Track</p>`;
  const message = {
    to: email,
    from: "notifications@connective-app.xyz",
    subject: "Verify email",
    text: template.replace(/<[^>]*>?/gm, ""),
    html: template,
  };
  try {
    await sgMail.send(message);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = sendEmail;
