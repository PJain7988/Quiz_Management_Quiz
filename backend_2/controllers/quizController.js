// controllers/quizController.js
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { subject, questionIds, duration, totalMarks, scheduleTime } = req.body;

    if (!subject || !questionIds || !duration || !totalMarks) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const quiz = await Quiz.create({
      subject,
      questions: questionIds,
      duration,
      totalMarks,
      scheduleTime,
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

// Create one or multiple questions
export const createQuestion = async (req, res) => {
  try {
    const data = req.body;
    const questionsArray = Array.isArray(data.questions) ? data.questions : [data];

    const createdQuestions = await Question.insertMany(questionsArray);
    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error('Error creating questions:', error);
    res.status(500).json({ message: 'Failed to create questions' });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('subject');
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};
