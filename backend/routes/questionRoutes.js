import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { createQuestion, getQuestions } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', protect, createQuestion);
router.get('/', protect, getQuestions);

export default router;