import mongoose from 'mongoose';
const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selected: { type: String }, // for mcq or true/false
  correct: { type: Boolean }
}, { _id: false });

const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  timeTakenSeconds: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Attempt', attemptSchema);
