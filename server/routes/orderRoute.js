const express = require("express");
const {
  newOrder,
  getAllUserOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateOrderAddress,
  updateOrderStatusAdmin,
  getOrderAdmin,
} = require("../controller/orderController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");
const orderRoute = express.Router();

// new order
orderRoute.route("/new").post(isAuthUser, newOrder);

// get user admin
orderRoute
  .route("/admin")
  .get(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), getAllOrders);
  
  // get all user order
  orderRoute.route("/user").get(isAuthUser, getAllUserOrders);

orderRoute
  .route("/admin/:id")
  .get(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), getOrderAdmin);

orderRoute.route("/:id").get(isAuthUser, getOrder);

orderRoute
  .route("/status/:id")
  .post(
    isAuthUser,
    isRoleIsValid("admin", "editor", "coeditor"),
    updateOrderStatus
  );

orderRoute
  .route("/status/admin/:id")
  .post(isAuthUser, isRoleIsValid("admin"), updateOrderStatusAdmin);

orderRoute.route("/adress/:id").post(isAuthUser, updateOrderAddress);
module.exports = orderRoute;
