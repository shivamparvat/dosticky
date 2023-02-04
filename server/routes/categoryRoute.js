const express = require("express");
const categoryRouter = express.Router();
const {
  newCategory,
  getCategory,
  updateCategory,
  categoryByName,
  deleteCategory,
} = require("../controller/categoryController");
const { isAuthUser, isRoleIsValid } = require("../middleware/auth");

categoryRouter.route("/new").post(isAuthUser,isRoleIsValid("admin"), newCategory)
categoryRouter.route("/:id").get(getCategory)
categoryRouter.route("/update/:id").patch(isAuthUser,isRoleIsValid("admin"),updateCategory)
categoryRouter.route("/search/").post(categoryByName)
categoryRouter.route("/delete/:id").delete(isAuthUser,isRoleIsValid("admin"),deleteCategory)
module.exports = categoryRouter;
