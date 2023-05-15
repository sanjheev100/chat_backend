const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { createBot } = require("whatsapp-cloud-api");

require("dotenv").config();

//server
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(`DB CONNECTION ERROR ${error}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);
const bot = createBot(process.env.WA_ID, process.env.WA_API_TOKEN);

//port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
