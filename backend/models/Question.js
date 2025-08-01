// models/questionModel.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'truefalse'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
export default Question;