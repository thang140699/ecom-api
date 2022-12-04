const express = require("express");
const {
  deleteNewFeed,
  createNewFeed,
  getNewFeed,
  updateNewFeed,
  getAdminNewFeed,
  getNewFeedDetails,
} = require("../controllers/newfeedController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/newFeeds").get(getNewFeed);
router
  .route("/admin/newFeed/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createNewFeed);
router
  .route("/admin/newFeeds")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminNewFeed);
router.route("/newFeed/:id").get(getNewFeedDetails);
router
  .route("/admin/newFeed/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateNewFeed)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    deleteNewFeed
  );

module.exports = router;
