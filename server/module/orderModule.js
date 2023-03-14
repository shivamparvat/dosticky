const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ordreSchema = new Schema(
  {
    user: {
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
    status: {
      type: String,
      enum: ["Confirmed", "Packaging", "Shipping", "Delivered"],
      default: "Confirmed",
    },
    deliveredAt: {
      type: Date,
    },
    payment:{
      type: Schema.Types.ObjectId,
      ref: "payment",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", ordreSchema);
