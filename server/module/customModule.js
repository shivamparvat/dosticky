const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is empty"],
  },
  images: { image_id: String, image_url: String },
  // 1234 size
  address: {
    type: Schema.Types.ObjectId,
    ref: "address",
    required: [true, "address is require"],
  },
  material_type:{
    type:String,
    enum: ['vinyl','radium'],
    defaultValue:'vinyl'
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
  status: {
    type: String,
    enum: ["order confirmed", "packaging", "shipping","delivered"],
    default: "order confirmed",
  },
});
module.exports = mongoose.model("cart", customSchema);
