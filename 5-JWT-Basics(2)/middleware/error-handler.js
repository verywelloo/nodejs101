const {CustomAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHanlerMiddleware = (err, req, res, next)=> {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({mag: err.message})
    }
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong, try again later')
}

module.exports = errorHandlerMiddleware