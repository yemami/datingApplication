const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Get all chats for the logged in user
router.get('/', authMiddleware, chatController.getAllChats);

// Get chat messages between two users
// router.get('/:userId', authMiddleware, chatController.getChatMessages);

// Send a message to a user
router.post('/:userId', authMiddleware, chatController.sendMessage);

module.exports = router;