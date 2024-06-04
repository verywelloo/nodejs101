const CustoAPIError = require("./custom-error");
const BadRequestError = require("./bad-request");
const NotFundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustoAPIError,
  BadRequestError,
  NotFundError,
  UnauthenticatedError,
};
