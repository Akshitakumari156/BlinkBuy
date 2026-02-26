const nodeMailer = require("nodemailer");

exports.sendMail= async(email,subject,body)=>{
    try {

        const tranporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        const info = tranporter.sendMail({
            from:"SmartX",
            to:email,
            subject:subject,
            html:body,
        });

        return info;
        
    } catch (error) {
        console.log("Error occur during sending mail",error);
        
    }
}