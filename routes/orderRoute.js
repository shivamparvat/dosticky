const express = require("express");
const { newOrder } = require("../controller/orderController");
const { isAuthUser } = require("../middleware/auth");
const orderRoute = express.Router()

orderRoute.route("/new").post(isAuthUser,newOrder)
module.exports = orderRoute;