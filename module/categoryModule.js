const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cetagorySchema = new schema({
  cetagory: {
    type: String,
    require: [true, "category name is empty"],
  },
  images: [{ image_id: String, image_url: String }],
  description: {
    type: String,
    required: [true, "description is require"],
  },
  parent: [{ category: String }],
});

module.exports = mongoose.model("cetagory", cetagorySchema);
