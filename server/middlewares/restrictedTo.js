

// Check if the user has the required role to access a resource

// ... is a spread operator that allows us to pass multiple roles as arguments`
const restrictedTo = (...roles) => {
    return (req, res, next) => {
        const { userRole } = req.user // Assuming req.user is set by a previous authentication middleware
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            })
        }
        next();
    }
}

module.exports = restrictedTo;