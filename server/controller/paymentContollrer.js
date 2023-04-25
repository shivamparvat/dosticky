const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Razorpay = require("razorpay");
const paymentModule = require("../module/paymentModule");
const crypto = require("crypto");
const ErrorHeandler = require("../utils/ErrorHeandler");
const cartModule = require("../module/cartModule");
const productModule = require("../module/productModule");
const orderModule = require("../module/orderModule");

// create order
exports.createPaymentOrder = CatchAsyncError(async (req, res, next) => {
  if (req.body.price == undefined)
    return next(new ErrorHeandler(400, "price is empty"));
  const instance = new Razorpay({
    key_id: process.env.RKEY_ID,
    key_secret: process.env.RKEY_SECRET,
  });
  var options = {
    amount: Number(req.body.price * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  const payment = await paymentModule.create({
    razorpay_order_id: order.id,
    price: req.body.price,
    user: req.user._id,
  });
  res.status(200).json({
    message: "success",
    id: order.id,
    paymentId: payment._id,
  });
});

// rezorpay key_id
exports.getkey = CatchAsyncError(async (req, res, next) =>
  res
    .status(200)
    .json({ message: "success", data: { key: process.env.RKEY_ID } })
);

exports.paymentVerification = CatchAsyncError(async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    slectedAddress,
    totalPrice,
    paymentId,
    tax,
    price,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RKEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    // Database comes here
    const user = req.user._id;
    const Cart = await cartModule.findOne({ user });
    if (!Cart) return next(new ErrorHeandler(400, "sonthing is Wrong"));
    Cart.items.map(async (item) => {
      const product = await productModule.findById(item.product);
      for (let i = 0; i < product.variants.length; i++) {
        if (item.size === product.variants[i].size) {
          product.variants[i].quantity -= item.quantity;
        }
      }
      await product.save();
    });
    const orderData = {
      user,
      items: Cart.items,
      address: slectedAddress,
      totalPrice: totalPrice,
      orderId: razorpay_order_id,
      payment: paymentId,
      tax,
      price,
    };
    console.log(Cart);
    const order = await orderModule.create(orderData);
    Cart.items = [];
    Cart.save();

    await paymentModule.findOneAndUpdate(
      { razorpay_order_id },
      {
        status: "paid",
        razorpay_payment_id,
        razorpay_signature,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      order:order._id,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
