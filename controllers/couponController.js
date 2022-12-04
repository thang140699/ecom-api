const Coupon = require("../models/couponModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const coupon = await Coupon.create(req.body);
  res.status(201).json({
    success: true,
    coupon,
  });
});

// Get All
exports.getCoupon = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const couponsCount = await Coupon.countDocuments();

  const apiFeature = new ApiFeatures(Coupon.find(), req.query)
    .search()
    .filter();

  let coupons = await apiFeature.query;

  let filteredCouponsCount = coupons.length;

  apiFeature.pagination(resultPerPage);

  coupons = await apiFeature.query;

  res.status(200).json({
    success: true,
    coupons,
    couponsCount,
    resultPerPage,
    filteredCouponsCount,
  });
});
// Get All
exports.getAdminCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    success: true,
    coupons,
  });
});
// update
exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    code: req.body.code,
    value: req.body.value,
  };
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.getCouponDetails = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHander("Không tìm thấy vourcher giảm giá", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

// Delete Orders

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHander("Không tìm thấy mã giảm giá", 404));
  }
  await coupon.remove();

  res.status(200).json({
    success: true,
    message: "Xóa mã giảm giá thành công !",
  });
});
