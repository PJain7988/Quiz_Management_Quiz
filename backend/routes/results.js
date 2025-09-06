const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const auth = require('../middleware/auth');

router.post('/', auth, async (req,res)=>{
  // student posts answers, calculate score (simple exact match)
  const { quizId, answers, timeTakenSeconds } = req.body;
  const ResultModel = require('../models/Result');
  const Quiz = require('../models/Quiz');
  const quiz = await Quiz.findById(quizId).populate('questions');
  if(!quiz) return res.status(404).json({message:'Quiz not found'});
  let score = 0;
  for(const a of answers){
    const q = quiz.questions.find(x=> String(x._id)===String(a.question));
    if(!q) continue;
    if(String(a.answer).trim() === String(q.correctAnswer).trim()) score++;
  }
  const result = await ResultModel.create({ quiz: quizId, student: req.user._id, answers, score, timeTakenSeconds });
  res.json(result);
});

router.get('/student/me', auth, async (req,res)=>{
  const list = await Result.find({ student: req.user._id }).populate('quiz');
  res.json(list);
});

module.exports = router;
