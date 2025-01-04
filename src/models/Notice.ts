import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['academic', 'event', 'announcement', 'other'],
    default: 'other',
  },
  attachments: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);