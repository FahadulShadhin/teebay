const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/variables.js');

const authMiddleware = (authHeader) => {
  try {
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('Unauthorized request');
      }

      const decodedToken = jwt.verify(token, jwtSecret);
      if (!decodedToken) {
        throw new Error('Invalid access token');
      }
      return decodedToken;
    }
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

module.exports = authMiddleware;
