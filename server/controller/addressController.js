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
});

exports.getAllAddress = CatchAsyncError(async (req, res, next) => {
  const data = await addressModule
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!data) next(new ErrorHandler(404, "address not found"));

  res.status(201).json({
    message: "success",
    data,
  });
});

exports.getAddress = CatchAsyncError(async (req, res, next) => {
  const data = await addressModule.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!data) {
    return next(new ErrorHeandler(404, "address not found"));
  }
  res.status(201).json({
    message: "success",
    data,
  });
});

exports.updateAddress = CatchAsyncError(async (req, res, next) => {

  const data = await addressModule.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!data) next(new ErrorHeandler(404,"address not found"));
  const address = await addressModule
  .find({ user: req.user._id })
  .sort({ createdAt: -1 });
  res.status(201).json({ message: "success", data:address });
});

exports.deleteAddress = CatchAsyncError(async (req, res, next) => {
  const address = await addressModule.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!address) next(new ErrorHeandler(404, "address not found"));
  await address.remove();
  const data = await addressModule
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });
  res.status(201).json({ message: "success", data });
});
