import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company/Institution is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['Work', 'Education', 'Certificate', 'Internship'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    default: null,
  },
  current: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: '',
  },
  certificateLink: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Experience', experienceSchema);

