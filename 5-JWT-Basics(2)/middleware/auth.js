const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
}