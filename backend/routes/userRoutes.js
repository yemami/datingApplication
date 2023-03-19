const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// GET a single user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// PATCH update current user
router.patch('/', authMiddleware, userController.updateCurrentUser);

// DELETE current user
router.delete('/', authMiddleware, userController.deleteCurrentUser);

module.exports = router;