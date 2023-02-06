const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Empty"],
  },
  lname: {
    type: String,
    required: [true, "Lname is Empty"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "other", "male", "female"],
  },
  age: {
    type: Number,
  },
  number: {
    type: Number,
    unique: [true, "number must be unique"],
    required: [true, "Number is Empty"],
  },
  email: {
    type: String,
    required: [true, "Email is Empty"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is Empty"],
  },
  images: { image_id: String, image_url: String },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "editor", "coeditor", "auther"],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  resetPassTokan: String,
  resetPassExport: String,
  created_at: {
    type: Date,
    defaultValue: Date.now,
  },
});

// pass hashing
userSchema.pre("save", async function (next) {
  // chack pass modified is true then pass hash auther wise => next()
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// genrate web token
userSchema.methods.getJwtToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
userSchema.methods.comperePassword = async function (inPassword) {
  return await bcrypt.compare(inPassword, this.password);
};

userSchema.methods.passwordResettoken = async function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPassTokan = crypto.createHash("sha256").update(token).digest("hex");
  // expaire time
  this.resetPassExport =
    Date.now() + parseInt(process.env.PASS_TOKEN_EXPIRE) * 60 * 1000;
  return token;
};

module.exports = mongoose.model("user", userSchema);
