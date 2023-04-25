const express = require("express");
const {
  createPaymentOrder,
  paymentVerification,
  PaymentSuccess,
} = require("../controller/paymentContollrer");
const { isAuthUser } = require("../middleware/auth");

const paymentRoute = express.Router();
paymentRoute.route("/new").post(isAuthUser, createPaymentOrder);
paymentRoute.route("/verification").post(isAuthUser, paymentVerification);
// paymentRoute.route("/paymentsuccess").get(PaymentSuccess);

module.exports = paymentRoute;
