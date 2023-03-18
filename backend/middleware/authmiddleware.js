const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports= verifyToken;

