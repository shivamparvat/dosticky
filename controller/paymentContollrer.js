const { CatchAsyncError } = require("../middleware/catchasyncerror");
const Razorpay = require("razorpay");
const paymentModule = require("../module/paymentModule");

// create order
exports.createPaymentOrder = CatchAsyncError(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RKEY_ID,
    key_secret: process.env.RKEY_SECRET,
  });
  var options = {
    amount: Number(req.body.price * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  await paymentModule({
    order_id: order.id,
    price: req.body.price,
    user: req.user._id,
  });
  res.status(200).json({
    message: "success",
    data: order,
  });
});

// rezorpay key_id
exports.getkey = CatchAsyncError(async (req, res, next) =>
  res
    .status(200)
    .json({ message: "success", data: { key: process.env.RKEY_ID } })
);

paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await paymentModule.findOneAndUpdate(
      { id: razorpay_order_id },
      {
        status: "paid",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.redirect(
      `${req.get("host")}paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
