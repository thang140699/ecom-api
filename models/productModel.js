const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên sản phẩm"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Nhập mô tả"],
  },
  info: {
    type: String,
    required: [true, "Nhập thông tin sản phẩm"],
  },
  promotion: {
    type: String,
    // required: [true, "Nhập giá"],
    default: 0,
    maxLength: [3, "Nhập % khuyến mãi"],
  },
  price: {
    type: String,
    required: [true, "Nhập giá"],
    maxLength: [20, "Giá tối đa 8 ký tự"],
  },
  productLine: {
    type: String,
    required: [true, "Nhập dòng sản phẩm"],
  },
  supplier: {
    type: String,
    required: ["Nhập nhà phân phối"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Nhập danh mục sản phẩm"],
  },
  brand: {
    type: String,
    required: [true, "Nhập danh hãng sản phẩm"],
  },
  Stock: {
    type: Number,
    required: [true, "Nhập số lượng"],
    maxLength: [4, "không vượt quá 4 ký tự"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

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

module.exports = mongoose.model("Product", productSchema);
