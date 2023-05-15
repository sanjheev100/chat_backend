const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    agentEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agents", agentSchema);
