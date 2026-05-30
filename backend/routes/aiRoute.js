const express = require("express");
const router = express.Router();

const {aiChatboat,productDescriptionEnhancer,productTitleEnhancer} = require("../controllers/aiController");
const {checkAuth}  = require("../middlewares/auth");

router.post("/aiChatboat",checkAuth,aiChatboat);
router.post("/productDescriptionEnhancer",checkAuth,productDescriptionEnhancer);
router.post("/productTitleEnhancer", checkAuth, productTitleEnhancer);

module.exports = router;