const express = require("express");
const router = express.Router();

const {createOpt,signUp,login,sendOtpforgotPassword,
forgotPasswordOtpVerifiy,resetPassword,updateProfilePicture,nameUpdate,passwordUpdate}  = require("../controllers/authController.js");

const {checkAuth} = require("../middlewares/auth");

router.post("/create-otp",createOpt);
router.post("/signup",signUp);
router.post("/login",login);
router.post("/sendOtpforgotPassword",sendOtpforgotPassword);
router.post("/forgotPasswordOtpVerifiy",forgotPasswordOtpVerifiy);
router.put("/resetPassword",resetPassword);
router.put("/updateProfilePicture",checkAuth,updateProfilePicture);
router.put("/nameUpdate",checkAuth,nameUpdate);
router.put("/passwordUpdate",checkAuth,passwordUpdate);




module.exports = router;