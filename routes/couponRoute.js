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

couponRoute.route("/new").post(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), newCoupon);
couponRoute.route("/").get(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), getAllCoupon);
couponRoute
  .route("/:id")
  .get(isAuthUser, getCoupon)
  .patch(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"), updateCoupon)
  .delete(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), deleteCoupon);

module.exports = couponRoute;
