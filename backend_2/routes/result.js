import express from 'express';
import { submitResult, getAllResults, getResultById } from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

router.post('/', protect, submitResult);

router.get('/', protect, admin, getAllResults);

router.get('/:id', protect, getResultById);

export default router;
