const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('./customError')

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NotFound
    }
}

module.exports = NotFound