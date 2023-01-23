const express = require("express");
const productRouter = express.Router();
const {
  Product,
  getProduct,
  updateProduct,
  categorySearch,
  moveToBin,
  deleteProduct,
} = require("../controller/productController");
const { isAuthUser } = require("../middleware/auth");

productRouter.route("/new").post(isAuthUser, Product);
productRouter.route("/:id").get(isAuthUser, getProduct);
productRouter.route("/update/:id").patch(isAuthUser, updateProduct);
productRouter.route("/producs").get(isAuthUser, categorySearch);
productRouter.route("/deactivate/:id").get(isAuthUser, moveToBin);
productRouter.route("/delete/:id").delete(isAuthUser, deleteProduct);

module.exports = productRouter;
