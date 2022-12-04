const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  imageBanner: {
    type: String,
    required: [true, "Chọn ảnh"],
  },
  bannerBonusLeft: {
    type: String,
    required: [true, "Chọn ảnh"],
  },
  bannerBonusRight: {
    type: String,
    required: [true, "Chọn ảnh"],
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
module.exports = mongoose.model("Banner", bannerSchema);
