const express = require("express");
const router = express.Router();

//controllers

const { createAgent, getAgent } = require("../controllers/agentController");

router.post("/createAgent", createAgent);
router.post("/getAgent", getAgent);

module.exports = router;
