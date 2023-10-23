const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is Empty"],
    },
    skuid: {
      type: String,
      // unique: [true, "sku Number must be unique"],
    },
    images: [{ image_id: String, image_url: String }],
    description: {
      type: String,
      required: [true, "description is require"],
    },
    category: [{ type: String, default: "rendom" }],
    customizable: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "description is empty"],
    },
    variants: [
      {
        size: {
          type: String,
          required: [true, "size is empty"],
        },
        quantity: {
          type: Number,
          required: [true, "quantity is empty"],
        },
        discountprice: {
          type: Number,
          required: [true, "discountprice is empty"],
        },
        price: {
          type: Number,
          required: [true, "price is empty"],
        },
      },
    ],
    sellCount: Number,
    likes: String,
    totallike: {
      type: Number,
      default: 0,
    },
    tags: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
