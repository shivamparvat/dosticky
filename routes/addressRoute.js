const express = require("express");
const addressRoute = express.Router();
const {
  newAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
} = require("../controller/addressController");
const { isAuthUser } = require("../middleware/auth");


addressRoute.route("/new").post(isAuthUser,newAddress);
addressRoute.route("/:id").get(isAuthUser,getAddress);
addressRoute.route("/all").get(isAuthUser,getAllAddress);
addressRoute.route("/update/:id").patch(isAuthUser,updateAddress);
addressRoute.route("/delete/:id").delete(isAuthUser,deleteAddress);

module.exports = addressRoute;


