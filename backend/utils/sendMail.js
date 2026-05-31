const nodeMailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Port 465 ke liye true hona zaroori hai
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // 🟢 Ye lines connection timeout ko fix karne ke liye hain
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 10000,
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