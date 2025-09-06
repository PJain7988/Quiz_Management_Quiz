const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({message:'No token'});
  const token = header.split(' ')[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  }catch(err){ return res.status(401).json({message:'Invalid token'}); }
}
module.exports = auth;
