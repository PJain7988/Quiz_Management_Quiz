import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      // Extract token
      token = req.headers.authorization.split(' ')[1];
      console.log('Received token:', token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to req object without password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } else {
      console.log('Authorization header missing or malformed:', req.headers.authorization);
      return res.status(401).json({ message: 'Not authorized, token missing or malformed' });
    }
  } catch (error) {
    console.error('Authorization error:', error.message);
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
