const express = require("express");
const router = express.Router();

//middlewares

//controllers
const { getCustomer } = require("../controllers/customerController");

router.post("/getCustomer", getCustomer);

module.exports = router;
