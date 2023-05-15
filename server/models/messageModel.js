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
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);
