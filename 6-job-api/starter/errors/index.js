const CustomAPIError = require("./customError");
const BadRequest = require("./badRequest");
const Unauthenticated = require("./untheticated");
const NotFound = require('./notFound')

module.exports = {
  CustomAPIError,
  BadRequest,
  Unauthenticated,
  NotFound,
};
