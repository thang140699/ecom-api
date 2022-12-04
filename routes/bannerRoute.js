const express = require("express");
const {
  createBanner,
  getBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/banner/create")
  .post(isAuthenticatedUser, authorizeRoles("admin", "manager"), createBanner);
router
  .route("/admin/banner")
  .get(isAuthenticatedUser, authorizeRoles("admin", "manager"), getBanner);
router
  .route("/admin/banner/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "manager"), updateBanner)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    deleteBanner
  );

module.exports = router;
