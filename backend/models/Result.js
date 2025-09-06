const mongoose = require('mongoose');
const Result = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [{ question: {type: mongoose.Schema.Types.ObjectId, ref:'Question'}, answer: String }],
  score: { type: Number, default: 0 },
  timeTakenSeconds: { type: Number, default: 0 }
}, { timestamps: true});
module.exports = mongoose.model('Result', Result);
