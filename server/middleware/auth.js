//auth middleware

const jwt = require("jsonwebtoken");

const exp = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        jwt.verify(token, 'longer-is-better')
        next();
    } catch (error) {
        res.status(401).json({
            Message:'No token cannot autherize'
        })
    }
}

module.exports = exp

