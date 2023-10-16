const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

function validateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, JWT);
        // Store decoded payload
        req.user = decoded;  
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = validateToken;