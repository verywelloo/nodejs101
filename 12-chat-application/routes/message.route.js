const express = require('express');
const router = express.Router();
const protectRoute= require('../middleware/auth.middleware')
const {
    getUserForSideBar,
    getMessages,
} = require('../controllers/message.controller')

router.get('/user', protectRoute, getUserForSideBar);
router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)

module.exports = router;
