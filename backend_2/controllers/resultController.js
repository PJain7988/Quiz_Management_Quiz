// controllers/resultController.js
import Result from '../models/Result.js';

// Submit a new result
export const submitResult = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { quizId, marks, timeTaken } = req.body;
    if (!quizId || marks == null || !timeTaken) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await Result.create({
      quiz: quizId,
      marks,
      timeTaken,
      user: req.user._id,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Submit Result Error:', error);
    res.status(500).json({ message: 'Failed to submit result', error: error.message });
  }
};

// Get all results (admin or student dashboard)
export const getAllResults = async (req, res) => {
  try {
    let results;
    if (req.user.role === 'admin') {
      results = await Result.find().populate('user', 'name email').populate('quiz', 'subject duration');
    } else {
      results = await Result.find({ user: req.user._id }).populate('quiz', 'subject duration');
    }
    res.status(200).json(results);
  } catch (error) {
    console.error('Get All Results Error:', error);
    res.status(500).json({ message: 'Failed to fetch results', error: error.message });
  }
};

// Get result by ID
export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('user', 'name email').populate('quiz', 'subject duration');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    // Ensure student can only access their own result
    if (req.user.role !== 'admin' && result.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get Result By ID Error:', error);
    res.status(500).json({ message: 'Failed to fetch result', error: error.message });
  }
};
