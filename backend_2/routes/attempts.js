import express from 'express';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import Attempt from '../models/Attempt.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Start attempt (fetches quiz questions in order or randomized)
router.post('/start/:quizId', auth, async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).populate('questionIds');
  if(!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const questionIds = quiz.randomize ? quiz.questionIds.sort(() => Math.random() - 0.5) : quiz.questionIds;
  const attempt = await Attempt.create({ quiz: quiz._id, student: req.user._id, answers: [] });
  res.json({
    attemptId: attempt._id,
    quiz: { id: quiz._id, title: quiz.title, durationMinutes: quiz.durationMinutes },
    questions: questionIds.map(q => ({ id: q._id, type: q.type, questionText: q.questionText, options: q.options }))
  });
});

// Submit answer per question
router.post('/answer/:attemptId', auth, async (req, res) => {
  const { questionId, selected } = req.body;
  const attempt = await Attempt.findById(req.params.attemptId);
  const question = await Question.findById(questionId);
  if(!attempt || !question) return res.status(400).json({ message: 'Invalid' });
  const correct = (selected || '') === question.correctAnswer;
  attempt.answers.push({ question: question._id, selected, correct });
  await attempt.save();
  res.json({ correct });
});

// Finish attempt
router.post('/finish/:attemptId', auth, async (req, res) => {
  const { timeTakenSeconds } = req.body;
  const attempt = await Attempt.findById(req.params.attemptId).populate('answers.question');
  if(!attempt) return res.status(404).json({ message: 'Not found' });
  attempt.timeTakenSeconds = timeTakenSeconds || 0;
  attempt.score = attempt.answers.reduce((acc, a) => acc + (a.correct ? 1 : 0), 0);
  await attempt.save();
  res.json({ score: attempt.score, answers: attempt.answers });
});

// Get results for a user or quiz
router.get('/results/my', auth, async (req, res) => {
  const list = await Attempt.find({ student: req.user._id }).populate('quiz');
  res.json(list);
});

export default router;
