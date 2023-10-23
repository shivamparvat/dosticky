const express = require("express");
const discountRoute = express.Router();
const {
  newDiscount,
  getDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscount
} = require("../controller/discountCoupon.controllers");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth.middlewares");


discountRoute.route("/new").post(isAuthUser,isRoleIsValid("admin", "editor"),newDiscount);//done
discountRoute.route("/").get(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),getAllDiscount);//done
discountRoute.route("/:id")
.get(isAuthUser,getDiscount)
.patch(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),updateDiscount)
.delete(isAuthUser,isRoleIsValid("admin", "editor", "coeditor"),deleteDiscount);//done

module.exports = discountRoute;
