const express = require("express");
const router = express.Router();

//middlewares

//controllers
const {
  sendMessage,
  getMessage,
  getReply,
  verify,
} = require("../controllers/messageControllers");

router.post("/sendMessage", sendMessage);
router.post("/getMessages", getMessage);
router.get("/webhook", verify);
router.post("/webhook", getReply);

module.exports = router;
