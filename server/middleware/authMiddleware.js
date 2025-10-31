const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mysecret';

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized. No token provided.',
      data: null
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      status: false,
      message: 'Invalid or expired token.',
      data: null
    });
  }
};

module.exports = { verifyAuth };
