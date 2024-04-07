const express = require('express');
const router = express.Router()
const {login, register} = require('../controller/auth')

router.post('/register', register) // It can write this way => router.route('/register').post(register)
router.post('/login', login) // It can write this way => router.route('/login').post(login)

module.exports = router