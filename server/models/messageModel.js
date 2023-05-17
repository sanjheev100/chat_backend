const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: ObjectId,
      ref: "conversations",
      required: true,
      index: true,
    },
    messageID: {
      type: String,
      required: true,
    },
    customerMobileNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
    },
    senderType: {
      type: String,
    },
    status: {
      type: String,
      // enum: ["Pending", "Not Delivered", "Sent", "Delivered", "Seen"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);
