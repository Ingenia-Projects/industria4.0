// routes/auth.js
const express = require('express');
const { login, validateToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.get('/validate-token', authMiddleware, validateToken);

module.exports = router;
