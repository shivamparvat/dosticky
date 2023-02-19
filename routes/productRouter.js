const express = require("express");
const productRouter = express.Router();
const {
  Product,
  getProduct,
  updateProduct,
  SearchUser,
  Search,
  moveToBin,
  deleteProduct,
  chackSku,
  categorySearchUser,
  likeProduct,
} = require("../controller/productController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");
const { multipleUpload } = require("../middleware/multer");

// new product
productRouter.route("/new").post(multipleUpload,isAuthUser,isRoleIsValid("admin", "editor", "coeditor"), Product); //done

// admin search
productRouter.route("/producs/admin").get(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), Search);//done


// get one product / update product / delate product 
productRouter.route("/:id")
.get(getProduct)
.patch(multipleUpload,isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), updateProduct)
.delete(isAuthUser, isRoleIsValid("admin", "editor"), deleteProduct);//done

// serach in normal pertion
productRouter.route("/").get(SearchUser);//done

productRouter.route("/like/:id").post(isAuthUser,likeProduct);//done

// move to bin 
productRouter.route("/deactivate/:id").delete(isAuthUser, isRoleIsValid("admin", "editor"), moveToBin);//done

// chack duplicate
productRouter.route("/chack").post(isAuthUser, isRoleIsValid("admin", "editor", "coeditor"), chackSku);//done

module.exports = productRouter;

