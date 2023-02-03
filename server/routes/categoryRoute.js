const express = require("express");
const categoryRouter = express.Router();
const {
  newCategory,
  getCategory,
  updateCategory,
  categoryByName,
  deleteCategory,
} = require("../controller/categoryController");


categoryRouter.route("/new").post(newCategory)
categoryRouter.route("/:id").get(getCategory)
categoryRouter.route("/update/:id").patch(updateCategory)
categoryRouter.route("/search/").post(categoryByName)
categoryRouter.route("/delete/:id").delete(deleteCategory)
module.exports = categoryRouter;
