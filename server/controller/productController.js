const { CatchAsyncError } = require("../middleware/catchasyncerror");
const productModule = require("../module/productModule");
const Crud = require("../utils/crud");
const ErrorHandler = require("../../../utils/ErrorHeandler");
const { isUnique } = require("../../../utils/validation");

// #####################################
// product creation
// #####################################

exports.Product = CatchAsyncError(async (req, res, next) => {
  // according to user data is unique or not
  await new Crud(productModule, req, res, next).create();
});

// get product
// ########################
//
exports.getProduct = CatchAsyncError(async (req, res, next) => {
  await new Crud(productModule, req, res, next).getOne();
});

// update
// 1234 alart unauth

exports.updateProduct = CatchAsyncError(
  async (req, res, next) =>
    {
      await new Crud(productModule, req, res, next).update("Product")
    }
);


// search only category wish
// #########################################
exports.categorySearch = CatchAsyncError(async (req, res, next) => {
  const bin = req.query.bin || false;
  const query = req.query;
  await new Crud(productModule, req, res, next).getAlldata("category", {
    user_id: req.user.id,
    isActive: bin,
    ...query,
  });
});

// this will move product in bin folder
// ###################
exports.moveToBin = CatchAsyncError(async (req, res, next) => {
  const product = await productModule.findById(req.params.id);
  product.isActive = true;
  product.save({ validateBeforeSave: false });
});

// if product in bin so this will delete parmanetly
// ###########################
exports.deleteProduct = CatchAsyncError(
  async (req, res, next) =>
    await new Crud(productModule, req, res, next).deleteForBin("product")
);
