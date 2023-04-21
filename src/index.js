const express = require("express");
const app = express();
require("dotenv").config();
const { databaseConnection } = require("./database/connection");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/privacy-policy.html"));
});

app.get("/terms-of-service", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/terms-of-service.html"));
});

app.get("/refund-cancellation-policy", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/../public/refund-cancellation-policy.html")
  );
});

const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const orderRoute = require("./routes/orderRoute");
const inquiryRoute = require("./routes/inquiryRoute");
const webhookRoute = require("./routes/webhookRoute");
const uploadFile = require("./service/uploadFile");

app.use("/api", authRoute);
app.use("/api", customerRoute);
app.use("/api", orderRoute);
app.use("/api", inquiryRoute);
app.use("/webhook", webhookRoute);
app.use("/api", uploadFile);

app.listen(port, () => {
  databaseConnection();
  console.log(`Server running on port ${port}`);
});
