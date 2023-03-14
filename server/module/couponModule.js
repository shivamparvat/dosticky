const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const currentDate = new Date();
const couponSchema = new Schema({
  coupon: {
    type: String,
    require: true,
    unique: true,
  },
  amount: { type: Number, required: true, default: process.env.COUPON_APPlY_PRICE },
  expireDate: {
    type: Date,
    require: true,
    default: () => currentDate + 7 * 24 * 60 * 60 * 1000,
  },
  discount:{
    type:Number,
    require: true,
    default:50,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: true,
  },
});
module.exports = mongoose.model("coupon", couponSchema);
