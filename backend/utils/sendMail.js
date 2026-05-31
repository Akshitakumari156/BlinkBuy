const nodeMailer = require("nodemailer");

exports.sendMail= async(email,subject,body)=>{
    try {

        const transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });


        const info =await transporter.sendMail({
            from:"SoilX",
            to:email,
            subject:subject,
            html:body,
        });
       console.log("Message sent: %s", info.messageId);
        return info;
        
    } catch (error) {
        console.log("Error occur during sending mail",error);
        throw error;
    }
}