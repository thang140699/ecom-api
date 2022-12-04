const Feedback = require("../models/feedbackModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createFeedback = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const feedback = await Feedback.create(req.body);
  res.status(201).json({
    success: true,
    feedback,
  });
});

// Get All
exports.getFeedback = catchAsyncErrors(async (req, res, next) => {
  const feedback = await Feedback.find();

  res.status(200).json({
    success: true,
    feedback,
  });
});
// update
exports.updateFeedback = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  };
  const feedback = await Feedback.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    feedback,
  });
});
exports.getFeedbackDetails = catchAsyncErrors(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorHander("Không tìm thấy bài viết", 404));
  }

  res.status(200).json({
    success: true,
    feedback,
  });
});
// Delete Orders

exports.deleteFeedback = catchAsyncErrors(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorHander("Không tìm thấy bài góp ý", 404));
  }
  await feedback.remove();

  res.status(200).json({
    success: true,
    message: "Xóa bài góp ý thành công !",
  });
});
