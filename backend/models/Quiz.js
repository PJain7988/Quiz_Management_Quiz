// models/Quiz.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  title: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;