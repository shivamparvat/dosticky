const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const ErrorModdelWare = require("./middleware/error");
var cookies = require("cookie-parser");


const userRouter = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoute");
const addressRoute = require("./routes/addressRoute");
const couponRoute = require("./routes/couponRoute");
const discountRoute = require("./routes/discountRoute");


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

// error
app.use(ErrorModdelWare);



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


module.exports = app;