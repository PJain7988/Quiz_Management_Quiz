const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({message:'Admin only'});
  const s = await Subject.create(req.body);
  res.json(s);
});
router.get('/', async (req,res)=>{ const all = await Subject.find(); res.json(all); });
module.exports = router;
