const sgMail = require("@sendgrid/mail");

exports.send = async function (subject, to, message) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to,
      from: "dpruslan@gmail.com",
      subject: subject,
      text: message,
      html: "<strong>" + message + "</strong>",
    };
    await sgMail.send(msg);

    return true;
  } catch (e) {
    // Log Errors
    throw Error("Error mail.service " + e.message);
  }
};
