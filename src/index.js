const express = require("express");
const app = express();
require("dotenv").config();
const { databaseConnection } = require("./database/connection");
const cors = require("cors");

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const memberRoute = require("./routes/memberRoute");
const orderRoute = require("./routes/orderRoute");
const inquiryRoute = require("./routes/inquiryRoute");
const webhookRoute = require("./routes/webhookRoute");
const uploadFile = require("./service/uploadFile");

app.use("/api", authRoute);
app.use("/api", customerRoute);
app.use("/api", memberRoute);
app.use("/api", orderRoute);
app.use("/api", inquiryRoute);
app.use("/api", uploadFile);
app.use("/webhook", webhookRoute);

app.listen(port, () => {
  databaseConnection();
  console.log(`Server running on port ${port}`);
});
