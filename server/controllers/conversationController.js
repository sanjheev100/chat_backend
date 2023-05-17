const ConversationModel = require("../models/conversationModel");
const AgentModel = require("../models/agentModel");
const CustomerModel = require("../models/customerModel");
const axios = require("axios").default;

exports.createConversation = async (req, res) => {
  let {
    customerMobileNumber,
    customerName = "Caratlane Customer",
    agentEmail,
  } = req.body;

  if (!agentEmail || !customerMobileNumber || !customerName) {
    return res
      .status(400)
      .json({ message: "Agent Email and Customer Details Must be provided" });
  }
  try {
    customerMobileNumber = `91${customerMobileNumber}`;
    let customerDoc = await CustomerModel.findOne({ customerMobileNumber });
    let agentDoc = await AgentModel.findOne({ agentEmail });
    let conversationDoc = await ConversationModel.findOne({
      customerID: customerDoc,
    }).populate(" customerID");
    if (!agentDoc) {
      agentDoc = await agentDoc.create({
        agentEmail,
      });
    }
    if (!customerDoc) {
      customerDoc = await new CustomerModel({
        customerMobileNumber,
        customerName: "Caratlane Customer",
      }).save();
    }
    if (conversationDoc) {
      return res.status(201).json(conversationDoc);
    } else {
      conversationDoc = await ConversationModel.create({
        customerID: customerDoc._id,
      });
    }
    await CustomerModel.findByIdAndUpdate(customerDoc, {
      $push: { previousAgents: agentDoc._id },
    });
    console.log(conversationDoc);
    res.status(200).json(conversationDoc);
  } catch (error) {
    console.log("Error While Creating Agent ::", error);
    res.status(502).json({ message: "Internal Server Error" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    let converstionsList = await ConversationModel.find().populate(
      "customerID"
    );
    return res.status(200).json({ data: converstionsList });
  } catch (error) {
    console.log("Error While Getting Conversations ::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
