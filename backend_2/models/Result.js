import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0, // ensure score is non-negative
    },
    timeTaken: {
      type: String, // optional, e.g., "12m 30s"
    },
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', resultSchema);
export default Result;
