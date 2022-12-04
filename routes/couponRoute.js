const express = require("express");
const {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getAdminCoupon,
  getCouponDetails,
} = require("../controllers/couponController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/coupons").get(getCoupon);
router.route("/coupon/:id").get(getCouponDetails);
router
  .route("/admin/coupon/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupon);
router
  .route("/admin/coupons")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCoupon);
router
  .route("/admin/coupon/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCoupon)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

module.exports = router;
