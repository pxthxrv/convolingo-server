const express = require('express');
const { updateUser, getUser } = require('../controllers/user-controller');
const router = express.Router();

// Get user information
router.get('/:id', getUser);

// Update user information route
router.patch('/update/:id', updateUser);

module.exports = router;