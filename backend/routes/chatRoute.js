const express = require("express");
const router = express.Router();

const {sendMessage,findConversation,chatUsers} = require("../controllers/chatController");
const {checkAuth}  = require("../middlewares/auth");

router.post("/sendMessage",checkAuth,sendMessage);
router.get("/findConversation/:receiverId",checkAuth,findConversation);
router.get("/chatUsers",checkAuth,chatUsers);

module.exports = router;