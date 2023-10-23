const express = require("express");
const {
  createPaymentOrder,
  paymentVerification,
  PaymentSuccess,
} = require("../controller/payment.controllers");
const { isAuthUser } = require("../middleware/auth.middlewares");

const paymentRoute = express.Router();
paymentRoute.route("/new").post(isAuthUser, createPaymentOrder);
paymentRoute.route("/verification").post(isAuthUser, paymentVerification);
// paymentRoute.route("/paymentsuccess").get(PaymentSuccess);

module.exports = paymentRoute;
