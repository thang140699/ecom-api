const Brand = require("../models/brandModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createBrand = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const brand = await Brand.create(req.body);
  res.status(201).json({
    success: true,
    brand,
  });
});

// Get All
exports.getBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.find();

  res.status(200).json({
    success: true,
    brand,
  });
});
// update
exports.updateBrand = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    address: req.body.address,
    productCate: req.body.productCate,
  };
  const brand = await Brand.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    brand,
  });
});

// Delete Orders

exports.deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHander("Không tìm thấy nhà phân phối", 404));
  }
  await brand.remove();

  res.status(200).json({
    success: true,
    message: "Xóa nhà phân phối thành công !",
  });
});
