const express = require('express');
const router = express.Router();
const { uploadProfilePicture } = require('../controllers/profileController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Upload profile picture
router.post('/profile/picture', authMiddleware, uploadProfilePicture);

module.exports = router;