import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_please_change', {
    expiresIn: '7d', // 1 week session
  });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username: username || email.split('@')[0],
      email,
      password: hashedPassword,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const loginIdentifier = email || username;

    const user = await User.findOne({
      $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { username, email, password } = req.body;
  const identifier = (username || email || 'admin').trim();
  const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@alsumora.com';

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  let adminUser = null;

  try {
    adminUser = await User.findOne({
      $or: [
        { username: identifier },
        { email: identifier },
        { email: envAdminEmail },
        { role: 'admin' }
      ]
    });
  } catch (err) {
    console.error('Database lookup error during admin login:', err.message);
  }

  // Verify password against DB hash or env passphrase
  let isMatch = (password === envAdminPass);
  if (!isMatch && adminUser && adminUser.password) {
    try {
      isMatch = await bcrypt.compare(password, adminUser.password);
    } catch (err) {
      isMatch = false;
    }
  }

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  // If password matched and adminUser exists in DB
  if (adminUser) {
    try {
      if (adminUser.role !== 'admin' || !adminUser.username) {
        adminUser.role = 'admin';
        if (!adminUser.username) adminUser.username = identifier || 'admin';
        await adminUser.save();
      }
    } catch (saveErr) {
      console.warn('Could not save updated admin role/username:', saveErr.message);
    }

    return res.json({
      _id: adminUser._id,
      name: adminUser.name || 'Admin',
      username: adminUser.username || 'admin',
      email: adminUser.email || envAdminEmail,
      role: 'admin',
      token: generateToken(adminUser._id),
    });
  }

  // If DB didn't find adminUser, try creating it in DB
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    adminUser = await User.create({
      name: 'Admin',
      username: identifier || 'admin',
      email: envAdminEmail,
      password: hashedPassword,
      role: 'admin',
      phone: '1234567890'
    });

    return res.json({
      _id: adminUser._id,
      name: adminUser.name,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role,
      token: generateToken(adminUser._id),
    });
  } catch (createErr) {
    console.warn('Could not persist admin user in DB, using fallback session:', createErr.message);
    const fallbackId = '650000000000000000000001';
    return res.json({
      _id: fallbackId,
      name: 'Admin',
      username: identifier || 'admin',
      email: envAdminEmail,
      role: 'admin',
      token: generateToken(fallbackId),
    });
  }
});

// @route GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @route GET /api/auth/users
// @desc Get all registered customers (Admin only)
router.get('/users', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }
    const users = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
