const express = require("express");
const router = express.Router();

const {aiChatboat,productDescriptionEnhancer} = require("../controllers/aiController");
const {checkAuth}  = require("../middlewares/auth");

router.post("/aiChatboat",checkAuth,aiChatboat);
router.post("/productDescriptionEnhancer",checkAuth,productDescriptionEnhancer);


module.exports = router;