const { CatchAsyncError } = require("../middleware/catchasyncerror.middlewares");
const Crud = require("../utils/crud");
const discountModule = require("../module/discountModule");
const couponModule = require("../module/couponModule");
const Apifeature = require("../utils/Apifeatures");
const ErrorHeandler = require("../utils/ErrorHeandler");

// copoun

exports.newCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).create();
});

exports.getCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).getOne();
});

exports.getAllCoupon = CatchAsyncError(async (req, res, next) => {
  const apifeatures = await new Apifeature(couponModule.find(), req.query)
    .search()
    .page()
    .filter();
    const data = await apifeatures.query;
  if (!data) this.next(new ErrorHandler(404, "coupon not found"));
  res.status(201).json({
    message: "success",
    data,
  });
  return data;
});

exports.updateCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).update();
});

exports.deleteCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).delete("coupon");
});

// discount
exports.newDiscount = CatchAsyncError(async (req, res, next) => {
  const discount = await discountModule.create(req.body);
  res.status(201).json({ success: true, data:discount });
});

exports.getDiscount = CatchAsyncError(async (req, res, next) => {
  const discount = await discountModule.findById(req.params.id);
  if (!discount) return next(new ErrorHeandler(404, "discount not available"));
  res.status(200).json({
    success: true,
    data:discount,
  });
});

exports.updateDiscount = CatchAsyncError(async (req, res, next) => {
  await new Crud(discountModule, req, res, next).update();
});

exports.getAllDiscount = CatchAsyncError(async (req, res, next) => {
  const apifeatures = await new Apifeature(discountModule.find(), req.query)
    .search()
    .page()
    .filter();
  const data = await apifeatures.query;
  if (!data) next(new ErrorHandler(404, "discount not found"));
  res.status(201).json({
    message: "success",
    data,
  });
});


exports.deleteDiscount = CatchAsyncError(async (req, res, next) => {
  await new Crud(discountModule, req, res, next).delete("discount");
});
