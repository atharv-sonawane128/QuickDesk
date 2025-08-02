const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret'; // same as auth.js

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Attach user info to request
    next();
  });
}

module.exports = authenticateToken;
