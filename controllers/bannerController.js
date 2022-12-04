const Banner = require("../models/bannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createBanner = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const banner = await Banner.create(req.body);
  res.status(201).json({
    success: true,
    banner,
  });
});

// Get All
exports.getBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.find();

  res.status(200).json({
    success: true,
    banner,
  });
});
// update
exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    imageBanner: req.body.imageBanner,
    bannerBonusLeft: req.body.bannerBonusLeft,
    bannerBonusRight: req.body.bannerBonusRight,
  };
  const banner = await Banner.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    banner,
  });
});

// Delete Orders

exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHander("Không tìm thấy ảnh", 404));
  }
  await banner.remove();

  res.status(200).json({
    success: true,
    message: "Xóa ảnh thành công !",
  });
});
