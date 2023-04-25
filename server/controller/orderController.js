const { query } = require("express");
const { CatchAsyncError } = require("../middleware/catchasyncerror");
const cartModule = require("../module/cartModule");
const orderModule = require("../module/orderModule");
const productModule = require("../module/productModule");
const Apifeature = require("../utils/Apifeatures");
const ErrorHeandler = require("../utils/ErrorHeandler");
const priceTotal = require("../utils/priceTotal");

// new order
exports.newOrder = CatchAsyncError(async (req, res, next) => {
  const user = req.user._id;

  const order = await orderModule.create(req.body);
  if (!order)
    return next(new ErrorHeandler(400, "something is wrong pleace contact us"));

  if (cart != undefined) {
    const cartData = await cartModule.findById(cart);
    cartData.items = [];
    await cartData.save({ validateBeforeSave: false });
  }
  for (let i = 0; i < products.length; i++) {
    const productId = products[i].product;
    const quantity = products[i].quantity;
    const productdata = await productModule.findById(productId);
    productdata.quantity -= quantity;
  }
  res.status(200).json({
    message: "success",
  });
});

// all order
exports.getAllOrders = CatchAsyncError(async (req, res, next) => {
  const apifeatures = await new Apifeature(orderModule.find(), req.query)
    .search()
    .page()
    .filter();
  const data = await apifeatures.query.sort({ createdAt: -1 });
  if (!data) return next(new ErrorHeandler(404, "orders not found"));
  res.status(201).json({
    message: "success",
    data,
  });
  return data;
});

exports.getAllUserOrders = CatchAsyncError(async (req, res, next) => {
  const query = {
    ...req.query,
    user: req.user._id,
  };
  const apifeatures = await new Apifeature(
    orderModule.find().populate([
      {
        path: "address",
        model: "address",
      },
      {
        path: "items",
        populate: {
          path: "product",
          model: "product",
        },
      },
    ]),
    query
  )
    .search()
    .page()
    .filter();
  const data = await apifeatures.query.sort({ createdAt: -1 });
  if (!data) return next(new ErrorHeandler(404, "orders not found"));
  res.status(201).json({
    message: "success",
    data,
  });
  return data;
});

// get one order
exports.getOrder = CatchAsyncError(async (req, res, next) => {
  const data = await orderModule
    .findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    .populate([
      {
        path: "items",
        populate: {
          path: "product",
          model: "product",
        },
      },
      {
        path: "address",
        model: "address",
      },
      {
        path: "payment",
        model: "Payment",
      },
    ]);

  if (!data) return next(new ErrorHeandler(404, "orders not found"));
  res.status(201).json({
    message: "success",
    data,
  });
});
// get one order
exports.getOrderAdmin = CatchAsyncError(async (req, res, next) => {
  const data = await orderModule.findById(req.params.id).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });
  if (!data) return next(new ErrorHeandler(404, "orders not found"));
  res.status(201).json({
    message: "success",
    data,
  });
});

// cencel/ change update status order
exports.updateOrderStatus = CatchAsyncError(async (req, res, next) => {
  const order = await orderModule.findById(req.params.id);
  if (!order) return next(new ErrorHeandler(404, "orders not found"));

  if (order.status === "Delivered") {
    return next(
      new ErrorHeandler(400, "You have already delivered this order")
    );
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    message: "success",
  });
});

// cencel/ change update status order
exports.updateOrderStatusAdmin = CatchAsyncError(async (req, res, next) => {
  const order = await orderModule.findById(req.params.id);
  if (!order) return next(new ErrorHeandler(404, "orders not found"));

  if (order.status == "Delivered") {
    await orderModule.updateOne(
      { _id: req.params.id },
      { $unset: { deliveredAt: 1 } }
    );
  }

  order.status = req.body.status;

  await order.save({ validateBeforeSave: false });
  res.status(201).json({
    message: "success",
  });
});

// change address order

exports.updateOrderAddress = CatchAsyncError(async (req, res, next) => {
  const order = await orderModule.findById(req.params.id);
  if (!order) return next(new ErrorHeandler(404, "orders not found"));

  if (order.status === "Confirmed") {
    order.address = req.body.address;

    await order.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "success",
    });
  } else {
    return next(
      new ErrorHeandler(
        400,
        "sorry we can't change address because order id packed"
      )
    );
  }
});
