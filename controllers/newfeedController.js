const NewFeed = require("../models/newFeedModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createNewFeed = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const newFeed = await NewFeed.create(req.body);
  res.status(201).json({
    success: true,
    newFeed,
  });
});

// Get All
exports.getNewFeed = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const newFeedsCount = await NewFeed.countDocuments();

  const apiFeature = new ApiFeatures(NewFeed.find(), req.query)
    .search()
    .filter();

  let newFeeds = await apiFeature.query;

  let filteredNewFeedsCount = newFeeds.length;

  apiFeature.pagination(resultPerPage);

  newFeeds = await apiFeature.query;

  res.status(200).json({
    success: true,
    newFeeds,
    newFeedsCount,
    resultPerPage,
    filteredNewFeedsCount,
  });
});

exports.getAdminNewFeed = catchAsyncErrors(async (req, res, next) => {
  const newFeeds = await NewFeed.find();
  res.status(200).json({
    success: true,
    newFeeds,
  });
});
// update
exports.updateNewFeed = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
    category: req.body.category,
  };
  const newFeed = await NewFeed.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newFeed,
  });
});

exports.getNewFeedDetails = catchAsyncErrors(async (req, res, next) => {
  const newFeed = await NewFeed.findById(req.params.id);

  if (!newFeed) {
    return next(new ErrorHander("Không tìm thấy bài viết", 404));
  }

  res.status(200).json({
    success: true,
    newFeed,
  });
});

// Delete Orders

exports.deleteNewFeed = catchAsyncErrors(async (req, res, next) => {
  const newFeed = await NewFeed.findById(req.params.id);

  if (!newFeed) {
    return next(new ErrorHander("Không tìm thấy bài viết", 404));
  }
  await newFeed.remove();

  res.status(200).json({
    success: true,
    message: "Xóa bài viết thành công !",
  });
});
