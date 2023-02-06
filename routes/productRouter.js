const express = require("express");
const productRouter = express.Router();
const {
  Product,
  getProduct,
  updateProduct,
  categorySearch,
  moveToBin,
  deleteProduct,
  chackSku,
} = require("../controller/productController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");
const { singleUpload, multipleUpload } = require("../middleware/multer");

productRouter.route("/new").post(multipleUpload,isAuthUser,isRoleIsValid("admin"), Product);
productRouter.route("/:id").get(isAuthUser, getProduct);
productRouter.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin"), updateProduct);
productRouter.route("/producs").get(isAuthUser, categorySearch);
productRouter.route("/deactivate/:id").get(isAuthUser,isRoleIsValid("admin"), moveToBin);
productRouter.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin"), deleteProduct);
productRouter.route("/chack/:id").get(chackSku);

module.exports = productRouter;
