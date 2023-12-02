const express = require('express')
const router = express.Router()


router.route('/dashboard').get()
router.route('/login').post()

module.exports = router 