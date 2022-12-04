const express = require("express");
const {
  deleteBrand,
  createBrand,
  getBrand,
  updateBrand,
} = require("../controllers/brandController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/brand/create")
  .post(isAuthenticatedUser, authorizeRoles("admin", "manager"), createBrand);
router
  .route("/admin/brand")
  .get(isAuthenticatedUser, authorizeRoles("admin", "manager"), getBrand);
router
  .route("/admin/brand/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "manager"), updateBrand)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "manager"), deleteBrand);

module.exports = router;
