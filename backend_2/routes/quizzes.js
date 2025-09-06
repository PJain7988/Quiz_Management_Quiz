import express from 'express';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, isAdmin, async (req, res) => {
  const { title, subject, questionIds, durationMinutes, scheduledAt, randomize } = req.body;
  const totalMarks = (await Question.find({ _id: { $in: questionIds } })).length;
  const quiz = await Quiz.create({ title, subject, questionIds, durationMinutes, scheduledAt, randomize, totalMarks, createdBy: req.user._id });
  res.status(201).json(quiz);
});

router.get('/', auth, async (req, res) => {
  const quizzes = await Quiz.find().populate('subject').sort({ createdAt: -1 });
  res.json(quizzes);
});

router.get('/:id', auth, async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('subject').populate('questionIds');
  if(!quiz) return res.status(404).json({ message: 'Not found' });
  res.json(quiz);
});

router.put('/:id', auth, isAdmin, async (req, res) => {
  const q = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
