const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default. If err has statuscode, use it.
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // Below, the logic is more friendly with 400(instead of 500) wiht get duplicate errors.
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  // No need to use because we have a customError.
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // Below, it's for duplicate email error.
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`; // Object.keys helps to show object property.
    customError.statusCode = 400;
  }

  if(err.name==="CastError") {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
  }
  // return res
  //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //   .json({err});
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
