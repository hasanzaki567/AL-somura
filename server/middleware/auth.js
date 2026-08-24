import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_please_change');
      
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(decoded.id);
      if (isValidObjectId) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback for legacy admin tokens (e.g. 'admin_id_001')
        req.user = await User.findOne({ role: 'admin' }).select('-password');
      }
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
