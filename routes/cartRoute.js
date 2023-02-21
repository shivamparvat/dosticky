const express = require("express");
const cartRoute = express.Router();
const {addTocart, getCart, addCoupon, deleteCartItem} = require("../controller/cartController");
const { isAuthUser } = require("../middleware/auth");


cartRoute.route("/new").post(isAuthUser,addTocart)//done
cartRoute.route("/").get(isAuthUser,getCart)//done
cartRoute.route("/").post(isAuthUser,addCoupon)//done
cartRoute.route("/:id").delete(isAuthUser,deleteCartItem)//done

module.exports = cartRoute;