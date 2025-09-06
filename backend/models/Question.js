const mongoose = require('mongoose');
const Question = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },
  type: { type: String, enum: ['mcq','tf','short'], default: 'mcq' },
  difficulty: { type: String, enum: ['easy','medium','hard'], default: 'easy' }
});
module.exports = mongoose.model('Question', Question);
