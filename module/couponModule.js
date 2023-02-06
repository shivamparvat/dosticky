const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  code: {
    type: String,
    require: true,
    unique: true,
  },
  amount: { type: Number, required: true, defaultValue: process.env.COUPON_APPlY_PRICE },
  expireDate: {
    type: Date,
    require: true,
    defaultValue: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  Discount:{
    type:Number,
    require: true,
    default:50,
  },
  isActive: {
    type: Boolean,
    require: true,
    defaultValue: true,
  },
});
module.exports = mongoose.model("coupon", couponSchema);
