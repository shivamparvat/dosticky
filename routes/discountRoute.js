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


discountRoute.route("/new").post(isAuthUser,isRoleIsValid("admin", "editor"),newDiscount);
discountRoute.route("/:id").get(isAuthUser,getDiscount);
discountRoute.route("/all").get(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),getAllDiscount);
discountRoute.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),updateDiscount);
discountRoute.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),deleteDiscount);

module.exports = discountRoute;
