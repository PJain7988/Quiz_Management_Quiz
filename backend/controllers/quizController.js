// controllers/quizController.js
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

// export const createQuestion = async (req, res) => {
//   try {
//     const question = await Question.create(req.body);
//     res.status(201).json(question);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create question' });
//   }
// };

// export const getQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch questions' });
//   }
// };
// controllers/quizController.js

export const createQuestion = async (req, res) => {
  try {
    const data = req.body;

    // Ensure it's always an array
    const questionsArray = Array.isArray(data) ? data : [data];

    const createdQuestions = await Question.insertMany(questionsArray);
    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error('Error creating questions:', error);
    res.status(500).json({ message: 'Failed to create questions' });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('subject');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};