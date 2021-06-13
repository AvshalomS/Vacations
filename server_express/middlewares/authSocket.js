// -----------------------------------------------------------------------------------------------------
// Authentication Middleware
// -----------------------------------------------------------------------------------------------------
const jwt = require('jsonwebtoken')

class authMiddleware {

    static isLogin(event) {
        return checkToken(event)
    }
    static isUser(event) {
        return checkToken(event, 'user')
    }
    static isAdmin(event) {
        return checkToken(event, 'Admin')
    }
}
module.exports = authMiddleware;

async function checkToken(event, role = null) {

    const { token } = event
    if (!token) return false
    const res = await jwt.verify(token, process.env.SECRET, (err, token) => {
        if (err) return false
        if (!role) return true
        if (token.role === role) return true
        return false
    })
    return res
}
