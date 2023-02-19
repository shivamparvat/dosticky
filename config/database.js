const mongoose = require("mongoose");

const database = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      process.env.NODE_ENV == "Development"
        ? process.env.DB_URL_DEV
        : process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = database;
