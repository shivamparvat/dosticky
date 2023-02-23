const express = require("express");
const { createPaymentOrder } = require("../controller/paymentContollrer");
const { isAuthUser } = require("../middleware/auth");

const paymentRoute = express.Router();
paymentRoute.route("/new").post(isAuthUser, createPaymentOrder);

module.exports = paymentRoute;
