const express = require("express");
const cartRoute = express.Router();
const {addTocart, getCart, addCoupon, deleteCartItem, bulkProductsCart, TotalPrice, UpdateCart} = require("../controller/cart.controllers");
const { isAuthUser } = require("../middleware/auth.middlewares");


cartRoute.route("/new").post(isAuthUser,addTocart)
cartRoute.route("/products/new").post(isAuthUser,bulkProductsCart)
cartRoute.route("/").get(isAuthUser,getCart)//done
cartRoute.route("/").post(isAuthUser,addCoupon)//done
cartRoute.route("/Total").get(isAuthUser,TotalPrice)//done
cartRoute.route("/:id").delete(isAuthUser,deleteCartItem)//done
cartRoute.route("/").patch(isAuthUser,UpdateCart)//done

module.exports = cartRoute;