const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const conversationSchema = new mongoose.Schema(
  {
    agentID: {
      type: ObjectId,
      ref: "Agents",
      required: true,
    },
    customerID: {
      type: ObjectId,
      ref: "Whatsapp_Customers",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", conversationSchema);
