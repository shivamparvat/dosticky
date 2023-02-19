const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ordreSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id  is require"],
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: [true, "product id  is require"],
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: [true, "address is require"],
    },
    quantity: {
      type: Number,
      defaultValue: 1,
    },
    price: {
      type: Number,
      required: [true, "price is require"],
    },
    tax: Number,
    status: {
      type: String,
      enum: ["order confirmed", "packaging", "shipping", "delivered"],
      default: "order confirmed",
    },
    delivery_time: {
      type: Date,
      default: null,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("ordre", ordreSchema);
