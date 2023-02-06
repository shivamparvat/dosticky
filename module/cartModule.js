const mongoose = require("mongoose");
const couponModule = require("./couponModule");
const discountModule = require("./discountModule");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is empty"],
      unique: [true, "cart must be one for one user"],
    },
    items: [
      {
        products: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, default: 1, require: true },
      },
    ],
    totalItem: Number,
    totalPrice: Number,
    coupon: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre(["validate", "save"], function (next) {
  this.totalItem = this.items.length;
  next();
});



userSchema.pre(/^find/, async function (next) {
  // stop recurtion
  if (this.options._recursed) {
    return next();
  }
  // get product data
  const data = this.populate({
    path: "items",
    populate: {
      path: "products",
      model: "product",
    },
    options: { _recursed: true },
  });
  // init values
  let price = 0;
  let quantity = 0;

  // total price and quantity
  let totlePrice = data.items.map((item) => {
    quantity += item.products.quantity;
    return (price += item.products.quantity * item.products.price);
  });

  // find discount percentage
  const discountdata = await discountModule.findOne({
    quantity: { $lte: quantity },
  });

  // get percentage
  discountPercentage = discountdata.discount;

  // calculate discounted price
  totlePrice = (totlePrice * discountPercentage) / 100;

  // apply coupon code

  // chack coupon exists
  if (this.coupon != null) {
    // chack price above then COUPON_APPlY_PRICE
    if (totlePrice > process.env.COUPON_APPlY_PRICE) {
      // find coupon code
      const couponData = await couponModule.findOne({
        code: this.coupon,
        isActive: true,
        expireDate: { $gte: new Date.now() },
      });
      // subtract price
      totlePrice -= totlePrice - couponData.discount;
    }
  }
  // save
  this.totalPrice = totlePrice;
  next();
});



module.exports = mongoose.model("cart", cartSchema);
