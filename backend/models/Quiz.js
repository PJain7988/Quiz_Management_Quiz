const mongoose = require('mongoose');
const Quiz = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  durationMinutes: { type: Number, default: 10 },
  totalMarks: { type: Number, default: 100 },
  randomized: { type: Boolean, default: false },
  scheduledAt: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('Quiz', Quiz);
