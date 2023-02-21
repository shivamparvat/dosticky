const mongoose = require("mongoose");
const couponModule = require("./couponModule");
const discountModule = require("./discountModule");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is empty"],
      unique: [true, "cart must be one for one user"],
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: { type: Number, default: 1, require: true },
      },
    ],
    totalItem: Number,
    totalPrice: Number,
    discountePrice: Number,
    coupon: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre(["validate", "save"], function (next) {
  this.totalItem = this.items.length;
  next();
});

module.exports = mongoose.model("cart", cartSchema);
