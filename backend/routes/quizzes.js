const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({message:'Admin only'});
  const quiz = await Quiz.create(req.body);
  res.json(quiz);
});
router.get('/', async (req,res)=>{ const q = await Quiz.find().populate('subject').populate('questions'); res.json(q); });
router.get('/:id', async (req,res)=>{ const q = await Quiz.findById(req.params.id).populate('questions'); res.json(q); });

module.exports = router;
