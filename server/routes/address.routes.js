const express = require("express");
const addressRoute = express.Router();
const {
  newAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
} = require("../controller/address.controllers");
const { isAuthUser } = require("../middleware/auth.middlewares");


addressRoute.route("/new").post(isAuthUser,newAddress);
addressRoute.route("/").get(isAuthUser,getAllAddress);
addressRoute.route("/:id").get(isAuthUser,getAddress)
addressRoute.route("/:id").delete(isAuthUser,deleteAddress)
addressRoute.route("/:id").patch(isAuthUser,updateAddress)
.patch(isAuthUser,updateAddress)
.delete(isAuthUser,deleteAddress);

module.exports = addressRoute;


