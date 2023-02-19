const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    require: [true, "name is empty"],
  },
  number: {
    type: String,
    require: [true, "number is empty"],
  },
  alternate_number: {
    type: String,
  },
  Street: {
    type: String,
    require: [true, "Street is empty"],
  },
  city: {
    type: String,
    require: [true, "city is empty"],
  },
  state: {
    type: String,
    require: [true, "state is empty"],
  },
  landmark: {
    type: String,
    require: [true, "street is empty"],
  },
  zip: {
    type: String,
    require: [true, "zip is empty"],
  },
});

module.exports = mongoose.model("address", addressSchema);
