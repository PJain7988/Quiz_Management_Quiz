const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/mailer');


router.post('/register', async (req,res)=>{
  try{
    const { name, email, rollNumber, password } = req.body;
    if(!name||!email||!rollNumber||!password) return res.status(400).json({message:'Missing fields'});
    let user = await User.findOne({ $or: [{email},{rollNumber}] });
    if(user) return res.status(400).json({message:'User exists'});
    const hash = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomBytes(20).toString('hex');
    user = await User.create({ name, email, rollNumber, password:hash, verifyToken });
    const link = `${process.env.CLIENT_URL}/verify-email?token=${verifyToken}&id=${user._id}`;
    try{ await sendVerificationEmail(email, link); }catch(e){ console.warn('Mailer failed', e.message); }
    res.json({ message: 'Registered. Check email for verification link (or use /auth/verify).' });
  }catch(err){ console.error(err); res.status(500).json({message:'Server error'}); }
});

router.get('/verify/:token', async (req,res)=>{
  try{
    const { token } = req.params;
    const user = await User.findOne({ verifyToken: token });
    if(!user) return res.status(400).json({message:'Invalid token'});
    user.isVerified = true;
    user.verifyToken = undefined;
    await user.save();
    res.json({message:'Email verified'});
  }catch(err){ res.status(500).json({message:'Server error'}); }
});

router.post('/login', async (req,res)=>{
  try{
    const { rollNumber, password } = req.body;
    const user = await User.findOne({ rollNumber });
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({message:'Invalid credentials'});
    if(!user.isVerified) return res.status(403).json({message:'Email not verified'});
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role, rollNumber: user.rollNumber } });
  }catch(err){ res.status(500).json({message:'Server error'}); }
});

module.exports = router;
