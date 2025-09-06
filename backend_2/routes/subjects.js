import express from 'express';
import Subject from '../models/Subject.js';
import { auth, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, isAdmin, async (req, res) => {
  const subj = await Subject.create({ name: req.body.name });
  res.status(201).json(subj);
});
router.get('/', auth, async (_req, res) => {
  const all = await Subject.find().sort({ name: 1 });
  res.json(all);
});
router.put('/:id', auth, isAdmin, async (req, res) => {
  const s = await Subject.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(s);
});
router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
