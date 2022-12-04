const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Nhập mã giảm giá"],
    trim: true,
  },
  value: {
    type: String,
    required: [true, "Nhập giá"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Coupon", couponSchema);
