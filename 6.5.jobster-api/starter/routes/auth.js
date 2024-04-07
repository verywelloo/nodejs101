const express = require("express");
const router = express.Router();
const { login, register, updateUser } = require("../controller/auth");
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: {
    msg: "Too many request  from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register); // It can write this way => router.route('/register').post(register)
router.post("/login", apiLimiter, login); // It can write this way => router.route('/login').post(login)
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
