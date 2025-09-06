const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');

router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({message:'Admin only'});
  const q = await Question.create(req.body);
  res.json(q);
});
router.get('/subject/:id', async (req,res)=>{ const qs = await Question.find({ subject: req.params.id }); res.json(qs); });
module.exports = router;
