const nodeMailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
    try {
        const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,          // 🔴 Changed to 587
    secure: false,      // 🔴 Must be false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // 🔴 Important for Render
    }
});

        // 🔴 AWAIT lagana mat bhoolna, logs ke mutabiq ye missing lag raha tha
        const info = await transporter.sendMail({
            from: `"BlinkBuy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: body,
        });

        console.log("Email sent: %s", info.messageId);
        return info;

    } catch (error) {
        console.log("Error occur during sending mail", error);
        throw error; 
    }
}