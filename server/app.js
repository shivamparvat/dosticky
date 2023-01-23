const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const fileUrlTopath = require("url").fileURLToPath;
const ErrorModdelWare = require("./middleware/error");
const userRouter = require("./routes/userRouter");
var cookies = require("cookie-parser");




// let __filename = fileUrlTopath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cookies());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// error
app.use(ErrorModdelWare);

// storage

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public/assets");
  },
  filename: function (req, file, cd) {
    cd(null, "public/assets");
  },
});


// router

app.use("/api/user",userRouter)

const upload = multer({ storage });

module.exports = app;