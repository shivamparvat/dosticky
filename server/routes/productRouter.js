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
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");

productRouter.route("/new").post(isAuthUser,isRoleIsValid("admin"), Product);
productRouter.route("/:id").get(isAuthUser, getProduct);
productRouter.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin"), updateProduct);
productRouter.route("/producs").get(isAuthUser, categorySearch);
productRouter.route("/deactivate/:id").get(isAuthUser,isRoleIsValid("admin"), moveToBin);
productRouter.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin"), deleteProduct);

module.exports = productRouter;
