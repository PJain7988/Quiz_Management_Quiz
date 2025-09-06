import express from 'express';
import Question from '../models/Question.js';
import { auth, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, isAdmin, async (req, res) => {
  const q = await Question.create(req.body);
  res.status(201).json(q);
});

router.get('/', auth, async (req, res) => {
  const { subject } = req.query;
  const filter = subject ? { subject } : {};
  const qs = await Question.find(filter).populate('subject');
  res.json(qs);
});

router.put('/:id', auth, isAdmin, async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
