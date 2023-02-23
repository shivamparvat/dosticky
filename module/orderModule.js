const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ordreSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id  is require"],
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quantity: { type: Number, default: 1, require: true },
      },
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: [true, "address is require"],
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
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("ordre", ordreSchema);
