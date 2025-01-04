import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exam: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: [{
    name: String,
    marks: Number,
    grade: String,
  }],
  totalMarks: Number,
  percentage: Number,
  grade: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);