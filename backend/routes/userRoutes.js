const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// GET a user details
router.get("/", authMiddleware, userController.getUserDetails);

// PATCH update current user
router.patch("/", authMiddleware, userController.updateCurrentUser);

module.exports = router;
