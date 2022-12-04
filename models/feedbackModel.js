const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Nhập email"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Nhập nội dung"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Feedback", feedbackSchema);
