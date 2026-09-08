const express = require('express');
const router = express.Router();
const { login, getPrivateData, logout } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/logout', logout);
router.get('/private', verifyToken, getPrivateData);

module.exports = router;