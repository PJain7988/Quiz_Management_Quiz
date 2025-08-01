// routes/subjectRoutes.js
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSubject);           // Create subject
router.get('/', protect, getAllSubjects);           // Get all subjects
router.put('/:id', protect, updateSubject);         // Update subject by ID
router.delete('/:id', protect, deleteSubject);      // Delete subject by ID

export default router;