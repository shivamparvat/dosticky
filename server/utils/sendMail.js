const nodeMailer = require("nodemailer");
module.exports = sendMail = async (option) => {
  const transporter = await
   nodeMailer.createTransport({
    // service: process.env.EMAIL_SERVICE,
    host: "smtp.example.com",
    port: 587,
    secure: false,
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
