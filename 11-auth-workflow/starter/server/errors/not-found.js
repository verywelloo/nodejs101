const CustomAPIError = require("./bad-request");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes;
  }
}

module.exports = NotFoundError;
