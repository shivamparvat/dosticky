const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ErrorModdelWare = require("./middleware/error");
var cookies = require("cookie-parser");


const userRouter = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoute");
const addressRoute = require("./routes/addressRoute");
const couponRoute = require("./routes/couponRoute");
const discountRoute = require("./routes/discountRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const path = require("path");




const app = express();
app.use(cookies());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/hello', (req, res) => {
  res.send('hello world')
})

app.use("/api/user",userRouter)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)
app.use("/api/payment",paymentRoute)
app.use("/api/address",addressRoute)
app.use("/api/category",categoryRouter)
app.use("/api/coupon",couponRoute)
app.use("/api/discount",discountRoute)

app.use(express.static(path.join(__dirname, "../client/build")));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
  

app.use(ErrorModdelWare);

module.exports = app;