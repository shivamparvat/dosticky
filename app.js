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
var cookies = require("cookie-parser");


const userRouter = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoute");
const addressRoute = require("./routes/addressRoute");
const couponRoute = require("./routes/couponRoute");
const discountRoute = require("./routes/discountRoute");


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
app.use("/",(req,res)=>{
  res.send("hello")
})
app.use("/api/product",productRoute)
app.use("/api/category",categoryRouter)
app.use("/api/address",addressRoute)
app.use("/api/coupon",couponRoute)
app.use("/api/discount",discountRoute)

const upload = multer({ storage });

module.exports = app;