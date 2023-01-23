const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is Empty"],
  },
  SKU: {
    type: String,
    required: [true, "Stock keeping unit or SKU is Required"],
  },
  price:{
    type:Number,
    required: [true, "price is require"],
  },
  quantity:{
    type:Number,
    required: [true, "quantity is require"],
    defaultValue: 1,
  },
  images: [{ image_id: String, image_url: String }],
  description: {
    type: String,
    required: [true, "description is require"],
  },
  category: [{ type: String, required: [true, "store id require"] }],
  customizable: {
    type: Boolean,
    defaultValue: false,
  },
  sellCount: Number,
  likes: Number,
  tags: [{ type: String }],
  created_at: {
    type: Date,
    defaultValue: Date.now,
  },
  isActive: {
    type: Boolean,
    defaultValue: false,
  },
});

module.exports = mongoose.model("product", productSchema);
