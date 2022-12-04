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
  const ordersSystem = await OrderSystem.find();
  let totalAmount = 0;
  ordersSystem.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    ordersSystem,
  });
});
// update Order Status
exports.updateOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy đơn đặt hàng với Id này", 404));
  }

  if (order.orderStatus === "Đã xong") {
    return next(new ErrorHander("Đã thanh toán thành công", 400));
  }
  if (req.body.orderStatus === "Đang xử lý") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.orderStatus === "Đang xử lý") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
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
