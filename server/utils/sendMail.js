const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SmartX" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: body,
    });

    return info;
  } catch (error) {
    console.log("Error sending mail:", error);
    throw error;
  }
};