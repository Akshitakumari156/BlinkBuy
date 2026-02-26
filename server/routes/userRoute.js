const express = require("express");
const router = express.Router();

const {createOpt}  = require("../controllers/authContoller");

router.post("/create-otp",createOpt);



module.exports = router;