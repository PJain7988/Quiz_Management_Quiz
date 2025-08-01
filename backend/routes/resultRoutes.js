import express from 'express';
import {
  submitResult,
  getAllResults,
  getResultById,
} from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitResult);           // Protected
router.get('/', protect, getAllResults);           // Protected
router.get('/:id', protect, getResultById);        // Protected

export default router;