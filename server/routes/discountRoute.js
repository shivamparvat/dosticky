const express = require("express");
const discountRoute = express.Router();
const {
  newDiscount,
  getDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscount
} = require("../controller/discountCouponController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");


discountRoute.route("/new").post(isAuthUser,isRoleIsValid("admin"),newDiscount);
discountRoute.route("/:id").get(isAuthUser,getDiscount);
discountRoute.route("/all").get(isAuthUser,isRoleIsValid("admin"),getAllDiscount);
discountRoute.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin"),updateDiscount);
discountRoute.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin"),deleteDiscount);

module.exports = discountRoute;