const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const discountSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, "quantity is require"],
      unique:[true,"disconut quantity already available"]
    },
    discount: {
      type: Number,
      required: [true, "price is require"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("discount", discountSchema);
