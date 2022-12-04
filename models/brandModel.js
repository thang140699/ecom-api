const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên hãng"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Nhập địa chỉ"],
  },
  productCate: {
    type: String,
    required: [true, "Nhập loại sản phẩm"],
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
module.exports = mongoose.model("Brand", brandSchema);
