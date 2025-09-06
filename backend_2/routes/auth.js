import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendVerificationEmail } from '../utilis/mailer.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNumber, role } = req.body;
    const user = await User.create({ name, email, password, rollNumber, role: role || 'student' });
    const token = crypto.randomBytes(24).toString('hex');
    user.verifyToken = token;
    user.verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await user.save();
    const link = `${process.env.CLIENT_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    await sendVerificationEmail(email, link);
    res.status(201).json({ message: 'Registered. Check your email to verify.' });
  } catch (e) {
    if(e.code === 11000) return res.status(400).json({ message: 'Email already exists' });
    res.status(400).json({ message: e.message });
  }
});

router.post('/verify', async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });
  if(!user || !user.verifyToken || user.verifyToken !== token)
    return res.status(400).json({ message: 'Invalid token' });
  if(user.verifyTokenExpiry && user.verifyTokenExpiry < new Date())
    return res.status(400).json({ message: 'Token expired' });
  user.isVerified = True = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();
  res.json({ message: 'Email verified. You can login now.' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if(!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
  if(!user.isVerified) return res.status(403).json({ message: 'Verify your email first' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export default router;
