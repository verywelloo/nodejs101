const customError = require("../errors");
const { isTokenValid } = require("../utils/jwt");
const Token = require("../models/token");
const { attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user; // req.user = { name: user.name, userId: user._id, role: user.role } not sure
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new customError.UnauthenticatedError("Authentication Invalid");
    }

    req.user = payload.user;
    next();
  } catch (error) {
    throw new customError.UnauthenticatedError("Authentication Invalid");
  }
};
//Above, it is for token authentication

//Below, it is for user roles authentication
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError.UnauthenticatedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
