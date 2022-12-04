const OrderSystem = require("../models/orderSystem");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Product = require("../models/productModel");
//Create order system

exports.createOrderSystem = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const orderSystem = await OrderSystem.create(req.body);
  res.status(201).json({
    success: true,
    orderSystem,
  });
});

// get Single Order
exports.getSingleOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Không tìm thấy đơn đặt hàng với Id này", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const ordersSystem = await OrderSystem.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    ordersSystem,
  });
});
// Get All order system
exports.getOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const ordersSystemCount = await OrderSystem.countDocuments();
  const ordersSystem = await OrderSystem.find();
  let totalAmountCash = 0;
  ordersSystem.forEach((order) => {
    totalAmountCash += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmountCash,
    ordersSystem,
    ordersSystemCount,
  });
});
// update Order Status
exports.updateOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const orderSystem = await OrderSystem.findById(req.params.id);

  if (!orderSystem) {
    return next(new ErrorHander("Không tìm thấy đơn đặt hàng với Id này", 404));
  }

  if (orderSystem.orderStatus === "Đã hoàn thành") {
    return next(new ErrorHander("Đã thanh toán thành công", 400));
  }

  if (req.body.status === "Đang giao") {
    orderSystem.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  orderSystem.orderStatus = req.body.status;

  if (req.body.status === "Đã hoàn thành") {
    orderSystem.deliveredAt = Date.now();
  }

  await orderSystem.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Orders

exports.deleteOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy đơn đặt hàng với Id này", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
    message: "Xóa lịch sử thành công !",
  });
});
