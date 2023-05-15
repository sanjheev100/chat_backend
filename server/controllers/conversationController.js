const ConversationModel = require("../models/conversationModel");
const AgentModel = require("../models/agentModel");
const CustomerModel = require("../models/customerModel");
const axios = require("axios").default;

exports.createConversation = async (req, res) => {
  const {
    customerMobileNumber,
    agentEmail,
    customerName = "Caratlane Customer",
  } = req.body;

  if (!agentEmail || !customerMobileNumber || !customerName) {
    return res
      .status(400)
      .json({ message: "Agent Email and Customer Details Must be provided" });
  }
  try {
    let customerDoc = await CustomerModel.findOne({ customerMobileNumber });
    let agentDoc = await AgentModel.findOne({ agentEmail });
    let conversationDoc = await ConversationModel.findOne({
      customerID: customerDoc,
      agentID: agentDoc._id,
    }).populate("agentID customerID");
    if (conversationDoc) {
      return res.status(201).json(conversationDoc);
    }
    if (!customerDoc) {
      customerDoc = await new CustomerModel({
        customerMobileNumber,
        customerName: "Caratlane Customer",
      }).save();
    }
    if (!agentDoc) {
      agentDoc = await agentDoc.create({
        agentEmail,
      });
    }

    await ConversationModel.create({
      agentID: agentDoc._id,
      customerID: customerDoc._id,
    });
    await CustomerModel.findByIdAndUpdate(customerDoc, {
      $push: { previousAgents: agentDoc._id },
    }).populate("agentID customerID");
    res.status(200).json(conversationDoc);
  } catch (error) {
    console.log("Error While Creating Agent ::", error);
    res.status(502).json({ message: "Internal Server Error" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { agentID } = req.body;
    console.log(agentID);
    let converstionsList = await ConversationModel.find({ agentID }).populate(
      "customerID"
    );
    console.log(converstionsList);
    return res.status(200).json({ data: converstionsList });
  } catch (error) {
    console.log("Error While Getting Conversations ::", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
