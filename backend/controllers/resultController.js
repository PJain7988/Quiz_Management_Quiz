// controllers/resultController.js
import Result from '../models/Result.js';

// Submit a new result
export const submitResult = async (req, res) => {
  try {
    const result = await Result.create({
      ...req.body,
      user: req.user._id, // associate result with authenticated user
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit result', error: error.message });
  }
};

// Get all results (admin or dashboard view)
export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate('user', 'name email');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch results', error: error.message });
  }
};

// Get result by ID
export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('user', 'name email');
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch result', error: error.message });
  }
};