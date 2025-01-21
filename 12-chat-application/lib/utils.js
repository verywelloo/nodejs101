const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // prevent XSS attacks
    samSite: 'strict', // CSRF attacks
    secure: process.env.NODE_ENV !== 'development', // 'production' !== 'development' makes secure: true
  });
};
