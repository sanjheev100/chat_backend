const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    customerMobileNumber: {
      type: String,
      required: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    previousAgents: [
      {
        type: ObjectId,
        ref: "Agents",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whatsapp_Customers", customerSchema);
