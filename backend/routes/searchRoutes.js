const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const searchController = require("../controllers/searchController");

// Search users
// PATCH update current user's liked users
router.post("/like-user", authMiddleware, searchController.likeUser);

// GET suggested matches for current user
router.get(
  "/suggested-matches",
  authMiddleware,
  searchController.getSuggestedMatches
);

module.exports = router;
