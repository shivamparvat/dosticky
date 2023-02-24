const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");
const cloudinary = require("cloudinary");


process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


if (process.env.NODE_ENV !== "Development") {
  dotenv.config({ path: "./config/config.env" });
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// data base conection
database();

// module.exports.handler = ServerlessHttp(app);
// servar lition
app.listen(process.env.PORT, () =>
  console.log(`server started http://localhost:${process.env.PORT}`)
);


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});