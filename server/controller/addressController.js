const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Crud = require("../utils/crud");
const addressModule = require("../module/addressModule");
const ErrorHeandler = require("../utils/ErrorHeandler");

exports.newAddress = CatchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const data = await addressModule.create(req.body);
  res.status(201).json({
    message: "success",
    data,
  });
  await new Crud(addressModule, req, res, next).create();
});

exports.getAllAddress = CatchAsyncError(async (req, res, next) => {
  const data = await addressModule.find({ user: req.user._id });
  if (!data) next(new ErrorHandler(404, "address not found"));
  data = data;
  res.status(201).json({
    message: "success",
    data,
  });
  return data;
});

exports.getAddress = CatchAsyncError(async (req, res, next) => {
  const data = await addressModule.findOne({ _id: req.params.id, user: req.user._id });
  if (!data) {
    return next(new ErrorHeandler(404, "address not found"));
  }
  res.status(201).json({
    message: "success",
    data,
  });
});

exports.updateAddress = CatchAsyncError(async (req, res, next) => {
  const address = await addressModule.findOne({ _id: req.params.id, user: req.user._id })
  if (!address) next(new ErrorHeandler(404, "address not found"));
  await new Crud(addressModule, req, res, next).update();
});

exports.deleteAddress = CatchAsyncError(async (req, res, next) => {
  const address = await addressModule.findOne({ _id: req.params.id, user: req.user._id })
  if (!address) next(new ErrorHeandler(404, "address not found"));
  await new Crud(addressModule, req, res, next).delete("address");
});
