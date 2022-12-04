const express = require("express");
const {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackDetails,
} = require("../controllers/feedbackController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/feedback/create").post(isAuthenticatedUser, createFeedback);
router.route("/admin/feedback").get(isAuthenticatedUser, getFeedback);
router.route("/feedback/:id").get(getFeedbackDetails);
router
  .route("/admin/feedback/:id")
  .put(isAuthenticatedUser, updateFeedback)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteFeedback);

module.exports = router;
