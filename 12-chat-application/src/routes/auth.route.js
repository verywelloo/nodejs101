const express = require('express');
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require('../src/controllers/auth.controller');
const protectRoute = require('../src/middleware/auth.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth);

module.exports = router;
