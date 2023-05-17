const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const conversationSchema = new mongoose.Schema(
  {
    customerID: {
      type: ObjectId,
      ref: "Whatsapp_Customers",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", conversationSchema);
