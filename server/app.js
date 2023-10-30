const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ErrorModdelWare = require("./middleware/error.middlewares");
var cookies = require("cookie-parser");


const userRouter = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const addressRoute = require("./routes/address.routes");
const couponRoute = require("./routes/coupon.routes");
const discountRoute = require("./routes/discount.routes");
const cartRoute = require("./routes/cart.routes");
const orderRoute = require("./routes/order.routes");
const paymentRoute = require("./routes/payment.routes");
const path = require("path");




const app = express();
app.use(cookies());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions ={
    origin:`*`, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// 


app.use(cors({
  origin: 'http://localhost:3001', // Replace with your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
}));
// app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });


app.use("/v1/api/user",userRouter)
app.use("/v1/api/product",productRoute)
app.use("/v1/api/cart",cartRoute)
app.use("/v1/api/order",orderRoute)
app.use("/v1/api/payment",paymentRoute)
app.use("/v1/api/address",addressRoute)
app.use("/v1/api/category",categoryRouter)
app.use("/v1/api/coupon",couponRoute)
app.use("/v1/api/discount",discountRoute)


app.use(express.static(path.join(__dirname, "../client/build")));

app.use(ErrorModdelWare);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
  

module.exports = app;