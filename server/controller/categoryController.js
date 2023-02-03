const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Crud = require("../utils/crud");
const categoryModule = require("../module/categoryModule");

exports.newCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).create();
});

exports.getCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).getOne();
});

exports.updateCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).update();
});

exports.categoryByName = CatchAsyncError(async (req, res, next) => {
  const bin = req.query.bin || false;
  const query = req.query;
  await new Crud(categoryModule, req, res, next).getAlldata("cetagory", {
    user_id: req.user.id,
    isActive: bin,
    ...query,
  });
});

exports.deleteCategory = CatchAsyncError(async (req, res, next) => {
  await new Crud(categoryModule, req, res, next).delete("cetagory");
});