const express = require("express");
const {
  createPaymentOrder,
  paymentVerification,
} = require("../controller/paymentContollrer");
const { isAuthUser } = require("../middleware/auth");

const paymentRoute = express.Router();
paymentRoute.route("/new").post(isAuthUser, createPaymentOrder);
paymentRoute.route("/verification").post(paymentVerification);

module.exports = paymentRoute;
