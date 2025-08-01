import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { createQuiz, getAllQuizzes, getQuizById } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', protect, createQuiz);         // Protected
router.get('/', protect, getAllQuizzes);       // Protected
router.get('/:id', protect, getQuizById);      // Protected

export default router;