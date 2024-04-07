const { BadRequestError } = require("../errors");

const testUser = (req, res, next) => {
  if (req.user.userId) {
    throw new BadRequestError("Test User. Read only");
  }
  next();
};

module.exports = testUser;
