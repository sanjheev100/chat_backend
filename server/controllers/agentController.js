const AgentModel = require("../models/agentModel");

exports.createAgent = async (req, res) => {
  const { agentEmail } = req.body;
  if (!agentEmail || agentEmail == "") {
    return res.status(400).json({ message: "Agent Email Must be provided" });
  }
  try {
    await new AgentModel({
      agentEmail,
    }).save();
    res.status(200).json({
      message: "Agent Created Successfully",
    });
  } catch (error) {
    console.log("Error While Creating Agent");
    res.status(502).json({ message: "Internal Server Error" });
  }
};

exports.getAgent = async (req, res) => {
  console.log(req.body);
  const { agentEmail } = req.body;
  console.log("agentEmail", agentEmail);
  if (!agentEmail || agentEmail == "") {
    return res.status(400).json({ message: "Agent Email Must be provided" });
  }
  try {
    let Agent = await AgentModel.findOne({ agentEmail });
    if (!Agent) return res.status(401).json({ message: "Unauthorized Access" });
    return res.status(200).json({ data: Agent });
  } catch (error) {
    console.log("Error While Creating Agent");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
