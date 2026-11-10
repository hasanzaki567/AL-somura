import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_please_change', {
    expiresIn: '7d', // 1 week session
  });
};

// @route POST /api/auth/google
// @desc Verify Google Identity Services ID Token and login/register user
router.post('/google', async (req, res) => {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      console.error('Missing GOOGLE_CLIENT_ID in server environment variables');
      return res.status(500).json({ message: 'Google authentication is not configured on the server' });
    }

    const { credential, token } = req.body;
    const idToken = credential || token;

    if (!idToken) {
      return res.status(400).json({ message: 'Google credential token is required' });
    }

    // Verify Google ID token securely using google-auth-library
    let ticket;
    try {
      const googleClient = new OAuth2Client(googleClientId);
      ticket = await googleClient.verifyIdToken({
        idToken,
        audience: googleClientId,
      });
    } catch (verifyError) {
      console.error('Google token verification failed:', verifyError.message);
      return res.status(401).json({ message: 'Invalid or expired Google token', error: verifyError.message });
    }

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Unable to retrieve user information from Google token' });
    }

    const googleId = payload.sub;
    const email = payload.email.toLowerCase();
    const name = payload.name || payload.given_name || 'Google User';
    const avatar = payload.picture || '';

    // Check if user already exists by googleId or email
    let user = await User.findOne({
      $or: [{ googleId }, { email }]
    });

    if (user) {
      let updated = false;
      if (!user.googleId) {
        user.googleId = googleId;
        updated = true;
      }
      if (!user.avatar && avatar) {
        user.avatar = avatar;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    } else {
      // Create a unique username for new Google user
      const cleanPrefix = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'user';
      let username = cleanPrefix;
      const existingUserWithUsername = await User.findOne({ username });
      if (existingUserWithUsername) {
        username = `${cleanPrefix}_${Math.floor(1000 + Math.random() * 9000)}`;
      }

      // Generate random hash for password security
      const randomSecret = Math.random().toString(36).slice(-10) + Date.now().toString(36);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomSecret, salt);

      user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        googleId,
        avatar,
        authProvider: 'google',
        role: 'customer',
      });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      authProvider: user.authProvider || 'google',
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Server error in /api/auth/google:', error);
    res.status(500).json({ message: 'Internal server error during Google login', error: error.message });
  }
});

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

    if (user && user.password && (await bcrypt.compare(password, user.password))) {
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
  const envAdminPass = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== 'production' ? 'admin123' : null);
  const envAdminEmail = process.env.ADMIN_EMAIL || (process.env.NODE_ENV !== 'production' ? 'admin@alsumora.com' : null);

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
