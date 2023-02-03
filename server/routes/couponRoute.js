const express = require("express");
const couponRoute = express.Router();
const {
  newCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupon,
} = require("../controller/discountCouponController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");


couponRoute.route("/new").post(isAuthUser,isRoleIsValid("admin"),newCoupon);
couponRoute.route("/:id").get(isAuthUser,getCoupon);
couponRoute.route("/all").get(isAuthUser,isRoleIsValid("admin"),getAllCoupon);
couponRoute.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin"),updateCoupon);
couponRoute.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin"),deleteCoupon);

module.exports = couponRoute;