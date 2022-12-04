const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên"],
    maxLength: [30, "Tên không dài quá 30 ký tự"],
    minLength: [4, "Tên tối thiệu 4 ký tự"],
  },
  email: {
    type: String,
    required: [true, "Nhập Email"],
    unique: true,
    validate: [validator.isEmail, "Định dạng Email không đúng"],
  },
  password: {
    type: String,
    required: [true, "nhập mật khẩu"],
    minLength: [6, "Mật khẩu tối thiểu 6 ký tự"],
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "Nhập số điện thoại"],
    length: [10, "số điện thoại phải là 10 số"],
  },
  address: {
    type: String,
    required: [true, "Nhập địa chỉ"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  point: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
