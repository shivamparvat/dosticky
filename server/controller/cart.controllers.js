const { CatchAsyncError } = require("../middleware/catchasyncerror.middlewares");
const cartModule = require("../module/cartModule");
const couponModule = require("../module/couponModule");
const productModule = require("../module/productModule");
const ErrorHeandler = require("../utils/ErrorHeandler");
const priceTotel = require("../utils/priceTotal");

// create update
exports.addTocart = CatchAsyncError(async (req, res, next) => {
  // get user id
  const user = req.user._id;
  const product_id = req.body.product;
  const quantity = req.body.quantity;
  const ProductSize = req.body.size;
  const productdata = await productModule.findById(product_id);
  if (!productdata) return next(new ErrorHeandler(404, "product not found"));

  // find cart is exist
  const Cart = await cartModule.findOne({ user }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });

  const variant = productdata.variants.filter(
    (item) => item.size === ProductSize
  );

  if (variant.quantity < quantity) {
    res.status(400).json({
      message: `only ${productdata.variants[variantIndex].quantity} piece available`,
    });
  }
  // // if cart not exist
  if (!Cart) {
    // checking quntity accoring size
    const filterProductData =
      productdata.variants &&
      productdata.variants.filter((item) => item.size === ProductSize);

    if (filterProductData.length === 0) {
      res.status(400).json({
        message: "Product size is not available",
        data: populateCart,
      });
    } else {
      if (filterProductData[0].quantity >= (quantity || 1)) {
        const cartDetails = {
          user: req.user._id,
          items: [{ ...req.body }],
        };

        // createing cart
        await cartModule.create(cartDetails);
        // populate data
        const populateCart = await cartModule.findOne({ user }).populate({
          path: "items",
          populate: {
            path: "product",
            model: "product",
          },
        });
        const data = await priceTotel(populateCart);
        res.status(201).json({
          message: "success",
          data: populateCart,
          cartTotal: data,
        });
      } else {
        res.status(400).json({
          message: "Product out of stoke",
        });
      }
    }
  } else {
    // if cart is exist then finding index of the product
    const cartindex = Cart.items.findIndex(
      (item) => item.product._id == product_id && item.size === ProductSize
    );
    // get product data
    // if product added before
    if (cartindex > -1) {
      const productItem = Cart.items[cartindex];
      // ince quantity
      productItem.quantity = quantity;
      Cart.items[cartindex] = productItem;
      // cart save
      await Cart.save();
    } else {
      // if cart isn't exist
      Cart.items.push({ ...req.body });
      await Cart.save();
    }
    // populate data and return
    const populateCart = await cartModule.findOne({ user }).populate({
      path: "items",
      populate: {
        path: "product",
        model: "product",
      },
    });
    const data = await priceTotel(populateCart);
    res.status(201).json({
      message: "success",
      data: populateCart,
      cartTotal: data,
    });
  }
});

// //////////////////////////

exports.bulkProductsCart = CatchAsyncError(async (req, res, next) => {
  const { products } = req.body.products;
  const user = req.user._id;

  // find cart is exist
  const Cart = await cartModule.findOne({ user }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });
  if (!Cart) {
    for (let i = 0; i < products.length; i++) {
      // get product id
      const product = products[i].product;
      // find product
      const productdata = await productModule.findOne(product);
      // if product not found
      if (!productdata)
        return next(new ErrorHeandler(404, "product not found"));
      // chack quantity
      if (productdata.quantity >= (products[i].quantity || 1)) {
        const cartDetails = {
          user: req.user._id,
          items: [{ ...req.body }],
        };
        // createing cart
        await cartModule.create(cartDetails);
        // populate data
        const populateCart = await cartModule.findOne({ user }).populate({
          path: "items",
          populate: {
            path: "product",
            model: "product",
          },
        });
        // find total price
        const { totalDiscountePrice, totalPrice } = await priceTotel(
          populateCart
        );
        populateCart.totalPrice = totalPrice;
        populateCart.discountePrice = totalDiscountePrice;
        // save total price and discount
        await populateCart.save();
        res.status(201).json({
          message: "success",
          data: populateCart,
        });
      } else {
        res.status(400).json({
          message: `only ${productdata.quantity} piece available`,
        });
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      // get product id
      const product = products[i].product;

      // find index
      const productdata = await productModule.findOne(product);

      // if product not found
      if (!productdata)
        return next(new ErrorHeandler(404, "product not found"));

      // product index
      const cartindex = Cart.items.findIndex(
        (item) => item.product._id == product
      );

      // cart product
      const productItem = Cart.items[cartindex];

      // if product added before
      if (cartindex > -1) {
        if (
          productdata.quantity >=
          parseInt(products[i].quantity) + productItem.quantity
        ) {
          // increase quantity
          if (products[i].quantity) {
            // if quantity is exist in req body
            productItem.quantity = products[i].quantity;
          } else {
            // if quantity isn't exist in req body
            productItem.quantity += 1;
          }
          Cart.items[cartindex] = productItem;
          // cart save
          await Cart.save();
        } else {
          res.status(400).json({
            message: `only ${productdata.quantity} piece available`,
          });
        }
      } else {
        if (productdata.quantity >= (products[i].quantity || 1)) {
          // if product not exist
          Cart.items.push({ ...products[i] });
          await Cart.save();
        } else {
          res.status(400).json({
            message: `only ${productdata.quantity} piece available`,
          });
        }
      }
    }
    // populate data and return
    const populateCart = await cartModule.findOne({ user }).populate({
      path: "items",
      populate: {
        path: "product",
        model: "product",
      },
    });
    if (!populateCart) return next(new ErrorHeandler(400, "cart is empty"));
    // save final amount
    const { totalDiscountePrice, totalPrice } = await priceTotel(populateCart);
    populateCart.totalPrice = totalPrice;
    populateCart.discountePrice = totalDiscountePrice;
    await populateCart.save();
    res.status(201).json({
      message: "success",
      data: populateCart,
    });
  }
});

// get cart
exports.getCart = CatchAsyncError(async (req, res, next) => {
  const Cart = await cartModule.findOne({ user: req.user._id }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (!Cart) return next(new ErrorHeandler(400, "cart is empty"));
  const data = await priceTotel(Cart);
  res.status(200).json({
    message: "success",
    data: Cart,
    cartTotal: data,
  });
  ``;
});

exports.addCoupon = CatchAsyncError(async (req, res, next) => {
  const coupon = req.body.coupon;
  if (coupon == undefined) next(new ErrorHeandler(400, "coupon is not found"));

  // find coupon code
  const currentDate = new Date();
  const couponData = await couponModule.findOne({
    coupon,
    isActive: true,
    expireDate: { $lt: currentDate },
  });
  // coupon is not found
  if (!couponData) return next(new ErrorHeandler(404, "invalid coupon code"));

  const Cart = await cartModule.findOneAndUpdate(
    { user: req.user._id },
    { coupon },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  // cart is not found
  if (!Cart) return next(new ErrorHeandler(404, "cart not found"));

  res.status(201).json({ message: "success" });
});

// delete item
exports.deleteCartItem = CatchAsyncError(async (req, res, next) => {
  const product = req.params.id;
  const Cart = await cartModule.findOne({ user: req.user._id }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));

  const cartindex = Cart.items.findIndex((item) => item.product._id == product);
  if (cartindex > -1) {
    Cart.items.splice(cartindex, 1);
  }

  await Cart.save();

  res.status(201).json({
    message: "success deleted",
    data: Cart,
  });
});

exports.TotalPrice = CatchAsyncError(async (req, res, next) => {
  const Cart = await cartModule.findOne({ user: req.user._id }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));
  const data = await priceTotel(Cart);
  res.status(200).json({
    message: "success",
    data,
  });
});

exports.UpdateCart = CatchAsyncError(async (req, res, next) => {
  const { product_id, quantity, size } = req.body;

  const productdata = await productModule.findById(product_id);
  if (!productdata) return next(new ErrorHeandler(404, "product not found"));

  const variant = productdata.variants.filter(
    (item) => item.size === size
  );

  if (variant.quantity < quantity) {
    res.status(400).json({
      message: `only ${productdata.variants[variantIndex].quantity} piece available`,
    });
  }

  const Cart = await cartModule.findOne({ user: req.user._id }).populate({
    path: "items",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (!Cart) return next(new ErrorHeandler(404, "cart is empty"));


  for (let i = 0; i < Cart.items.length; i++) {
    if (Cart.items[i].product._id == product_id) {
      Cart.items[i].quantity = quantity;
      Cart.items[i].size = size;
    }
  }
  Cart.save();
  res.status(200).json({
    message: "success",
    data: Cart,
  });
});
