const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is empty"],
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "product", required: true },
      quantity: { type: Number, default: 1, require: true },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
