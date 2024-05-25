const mongoose = require("mongoose");
const DATABASE_URL = 'mongodb+srv://apppicknt:pickntrack2023@cluster0.rrtakhl.mongodb.net/test'
const databaseConnection = () => {
  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { databaseConnection };
