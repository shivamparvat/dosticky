const { CatchAsyncError } = require("../middleware/catchasyncerror");
const cartModule = require("../module/cartModule");
const ErrorHeandler = require("../utils/ErrorHeandler");

// create update
exports.addTocart = CatchAsyncError(async (req, res, next) => {
  const Cart = await cartModule.findOne({ user_id: req.user });
  const products = req.body.product;
  const quantity = req.body.quantity;
  if (!Cart) {
    const cartDetails = { user_id: req.user, items: [{ products, quantity }] };
    const data = await cartModule.create(cartDetails);
    res.status(201).json({
      message: "success",
      data,
    });
  } else {
    const cartindex = Cart.items.findIndex((item) => item.products == products);
    if (cartindex > -1) {
      const productItem = Cart.items[cartindex];
      productItem.quantity = quantity;
      Cart.items[cartindex] = productItem;
    } else {
      Cart.items.push({ products, quantity });
    }
    const cartData = await Cart.save();
    res.status(201).json({
      message: "success",
      cartData,
    });
  }
});


// get cart
exports.getCart = CatchAsyncError(async (req, res, next) => {
  const Cart = cartModule.find({ user_id: req.user }).populate({
    path: "items",
    populate: {
      path: "products",
      model: "product",
    },
  });
  
  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));
  
  res.status(200).json({
    message: "success",
    Cart,
  });
});


exports.addCoupon = CatchAsyncError(async (req, res, next) => {
  const coupon = req.body.coupon;
  const Cart = await cartModule.findByIdAndUpdate(
    req.user,
    coupon,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!Cart) this.next(new ErrorHandler(404, "cart not found"));
  
  res.status(201).json({ message: "success", Cart });
});


// delete item
exports.deleteCartItem = CatchAsyncError(async (req, res, next) => {
  const products = req.body.product;
  
  const Cart = await cartModule.findOne({ user_id: req.user });
  
  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));
  
  const cartindex = Cart.items.findIndex((item) => item.products == products);
  if (cartindex > -1) {
    Cart.items.splice(cartindex, 1);
  }
  
  await Cart.save();
  
  res.status(201).json({
    message: "success deleted",
  });
});

