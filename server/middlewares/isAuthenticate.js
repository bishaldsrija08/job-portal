const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../model');

// Middleware to check if the user is authenticated
const isAuthenticate = async (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({
            message: "Unauthorized access! Please login to continue."
        })
    }
    try {
        // verify token with promisify (promisify is used to convert callback based function to promise based function)
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        // Check if user still exists
        const doesUserExist = await User.findByPk(decoded.id)
        if (!doesUserExist) {
            return res.status(400).json({
                message: "The user belonging to this token does no longer exist."
            })
        }
        // Attach user data to request object
        req.user = doesUserExist
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Unauthorized access! Please login to continue."
        })
    }
}

module.exports = isAuthenticate;