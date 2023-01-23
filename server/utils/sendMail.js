const nodeMailer = require("nodemailer");
module.exports = sendMail = async (option) => {
  console.log(option.massage)
  const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: option.email,
    subject: option.subject,
    text: option.massage,
  };
  await transporter.sendMail(mailOptions);
};
