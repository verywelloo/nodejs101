const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;

  // "Bearer " It have to have space on the end. If not, the token will invalid.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to the job routes

    // It's for take password out while working in jobs controllers for security.
    // So,we use code below instead, cause we don't have function to remove the user at the first place(teacher said).
    // const user = User.findById(payload.id).select('-password')
    // req.user = user
    const testUser = payload.userId === "65f4071236c0be35280b0c93";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;

// 65f4071236c0be35280b0c93 => demo user
