const MessageModel = require("../models/messageModel");
const axios = require("axios");
const { createBot } = require("whatsapp-cloud-api");

const formatCustomerMobileNumber = (mobileNumber) => {
  if (mobileNumber.length == 10) {
    return `91${mobileNumber}`;
  } else {
    return mobileNumber;
  }
};

exports.sendMessage = async (req, res) => {
  const {
    message,
    senderID = "",
    senderType = "",
    conversationID,
    customerMobileNumber,
  } = req.body;
  if (!message || !conversationID || !customerMobileNumber) {
    return res.status(400).json({ message: "Invalid Access" });
  }
  try {
    const bot = createBot(process.env.WA_ID, process.env.WA_API_TOKEN);
    const result = await bot.sendText(
      formatCustomerMobileNumber(customerMobileNumber),
      message,
      { preview_url: true }
    );
    await MessageModel.create({
      message,
      conversationID,
      senderID,
      senderType,
    });
    res.status(200).json({
      message: "Message sent Successfully",
    });
  } catch (error) {
    console.log("Error While Sending Messgae ::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessage = async (req, res) => {
  const { conversationID } = req.body;
  try {
    let messagesArray = await MessageModel.find({ conversationID });
    return res.status(200).json({ data: messagesArray });
  } catch (error) {
    console.log("Error While Fetching Message ::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verify = async (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  let mytoken = "sanjheev_10";
  console.log("sanjheev");
  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
};

exports.getReply = async (req, res) => {
  let body = req.body;
  console.log(JSON.stringify(body, null, 2));
  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_no_id =
        body.entry[0].challenge[0].value.metadata.phone_number_id;
      let text = body.entry[0].challenge[0].value.messages[0].text.body;
    }
  }
};
