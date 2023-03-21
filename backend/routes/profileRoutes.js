const express = require("express");
const router = express.Router();
const { uploadProfilePicture } = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../utility/storage");

// Upload profile picture
router.post(
  "/upload-picture",
  [authMiddleware, upload.single("profilePic")],
  uploadProfilePicture
);
module.exports = router;
