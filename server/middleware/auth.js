//auth middleware

const jwt = require("jsonwebtoken");

const exp = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        
        jwt.verify(token, 'your-256-bit-secret')
        next();
    } catch (error) {
        res.status(401).json(
            `${error.message} + ${error.name}`
        
        )
    }
}

module.exports = exp

