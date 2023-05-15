const express = require("express");
const router = express.Router();

//middlewares

//controllers
const {
  createConversation,
  getConversation,
} = require("../controllers/conversationController");

router.post("/createConversation", createConversation);
router.post("/getConversations", getConversation);

module.exports = router;
