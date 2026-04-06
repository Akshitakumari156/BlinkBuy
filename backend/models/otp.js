const mongoose = require("mongoose");
const { sendMail } = require("../utils/sendMail");
const { otpEmailTemplate } = require("../templates/otpEmailTemplate");

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});

const sendOtp = async(email,otp)=>{
    await sendMail(email,"for otp verfication",otpEmailTemplate(otp))
}

otpSchema.pre("save",async function(next){
await sendOtp(this.email,this.otp);
next();
});

module.exports = mongoose.model("OTP",otpSchema);


