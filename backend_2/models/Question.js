import mongoose from 'mongoose';
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  type: { type: String, enum: ['mcq', 'truefalse'], default: 'mcq' },
  questionText: { type: String, required: true },
  options: [optionSchema], // For mcq
  correctAnswer: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
