const express = require("express");
const app = express();
require("dotenv").config();
const { databaseConnection } = require("./database/connection");
const cors = require("cors");

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const authRoute = require("./routes/authRoute");

app.use("/api", authRoute);

app.listen(port, () => {
  databaseConnection();
  console.log(`Server running on port ${port}`);
});
