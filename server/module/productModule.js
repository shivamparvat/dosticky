const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is Empty"],
    },
    sku: {
      type: String,
      unique: [true, "SKU Number must be unique"],
      required: [true, "Stock keeping unit or SKU is Required"],
    },
    price: {
      type: Number,
      required: [true, "price is require"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is require"],
      default: 1,
    },
    images: [{ image_id: String, image_url: String }],
    description: {
      type: String,
      required: [true, "description is require"],
    },
    category: [{ type: String, required: [true, "store id require"] }],
    customizable: {
      type: Boolean,
      default: false,
    },
    sellCount: Number,
    likes: String,
    tags: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
