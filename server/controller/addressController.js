const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Crud = require("../utils/crud");
const addressModule = require("../module/addressModule");

exports.newAddress = CatchAsyncError(async (req, res, next) => {
  await new Crud(addressModule, req, res, next).create();
});

exports.getAllAddress = CatchAsyncError(async (req, res, next) => {
  const data = await addressModule.find({user:req.user._id});
    if (!data) this.next(new ErrorHandler(404, "address not found"));
    this.data = data;
    this.res.status(201).json({
      massage: "success",
      data,
    });
    return data;
});

exports.getAddress = CatchAsyncError(async (req, res, next) => {
  await new Crud(addressModule, req, res, next).getOne();
});

exports.updateAddress = CatchAsyncError(async (req, res, next) => {
  await new Crud(addressModule, req, res, next).update();
});

exports.deleteAddress = CatchAsyncError(async (req, res, next) => {
  await new Crud(addressModule, req, res, next).delete("address");
});