const { CatchAsyncError } = require("../middleware/catchasyncerror");
const cartModule = require("../module/cartModule");

// new order
exports.newOrder = CatchAsyncError(async (req, res, next) => {
  const user = req.user._id;
  const Cart = await cartModule.findOne({ user }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });
  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));
  const items = Cart.items;
  const price = Cart.discountePrice + Cart.tax;

  console.log(price)
  const paymentOptions = {
    amount: price*100,  // amount in the smallest currency unit
    currency: "INR"
  };


  const orderData = {
    user,
    items,
    address: req.body.address,
    price,
  };


  res.status(200).json({
    message: "success",
  });
});
// all order
// get one order
// cencel order
// change address order
// change number order
