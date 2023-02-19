const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Crud = require("../utils/crud");
const discountModule = require("../module/discountModule");
const couponModule = require("../module/couponModule");
const Apifeature = require("../utils/Apifeatures");


// copoun

exports.newCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).create();
});

exports.getCoupon = CatchAsyncError(async (req, res, next) => {
  await new Crud(couponModule, req, res, next).getOne();
});

exports.getAllCoupon = CatchAsyncError(async (req, res, next) => {
  const data = await new Apifeature(couponModule.find(),req.query).search().page().filter();
    if (!data) this.next(new ErrorHandler(404, "coupon not found"));
    this.data = data;
    this.res.status(201).json({
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
  await new Crud(discountModule, req, res, next).create();
});

exports.getDiscount = CatchAsyncError(async (req, res, next) => {
  await new Crud(discountModule, req, res, next).getOne();
});

exports.updateDiscount = CatchAsyncError(async (req, res, next) => {
  await new Crud(discountModule, req, res, next).update();
});

exports.getAllDiscount = CatchAsyncError(async (req, res, next) => {
  const data = await new Apifeature(discountModule.find(),req.query).search().page().filter();
    if (!data) this.next(new ErrorHandler(404, "discount not found"));
    this.data = data;
    this.res.status(201).json({
      message: "success",
      data,
    });
    return data;
});

exports.deleteDiscount = CatchAsyncError(async (req, res, next) => {
  await new Crud(discountModule, req, res, next).delete("discount");
});