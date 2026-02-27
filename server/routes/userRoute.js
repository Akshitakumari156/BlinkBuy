const express = require("express");
const router = express.Router();

const {createOpt,signUp,login,sendOtpforgotPassword,forgotPasswordOtpVerifiy,resetPassword}  = require("../controllers/authContoller");

router.post("/create-otp",createOpt);
router.post("/signup",signUp);
router.post("/login",login);
router.post("/sendOtpforgotPassword",sendOtpforgotPassword);
router.post("/forgotPasswordOtpVerifiy",forgotPasswordOtpVerifiy);
router.put("/resetPassword",resetPassword);



module.exports = router;