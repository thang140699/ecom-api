const mongoose = require("mongoose");
const newFeedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Nhập tiêu đề"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Nhập link ảnh"],
  },
  content: {
    type: String,
    required: [true, "Nhập nội dung"],
  },
  category: {
    type: String,
    required: [true, "Nhập danh mục bài viết"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("NewFeed", newFeedSchema);
