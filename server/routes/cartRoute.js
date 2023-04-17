const express = require("express");
const cartRoute = express.Router();
const {addTocart, getCart, addCoupon, deleteCartItem, bulkProductsCart, totlePrice} = require("../controller/cartController");
const { isAuthUser } = require("../middleware/auth");


cartRoute.route("/new").post(isAuthUser,addTocart)
cartRoute.route("/products/new").post(isAuthUser,bulkProductsCart)
cartRoute.route("/").get(isAuthUser,getCart)//done
cartRoute.route("/").post(isAuthUser,addCoupon)//done
cartRoute.route("/totle").get(isAuthUser,totlePrice)//done
cartRoute.route("/:id").delete(isAuthUser,deleteCartItem)//done

module.exports = cartRoute;