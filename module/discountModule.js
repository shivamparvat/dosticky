const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    quantity:{
      type:Number,
      require:[true,'quantity is require']
    },
    discount:{
      type:Number,
      require:[true,'discount is require']
    }
});

module.exports = mongoose.model("discount", discountSchema);
