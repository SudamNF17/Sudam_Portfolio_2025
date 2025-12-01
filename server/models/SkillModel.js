import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Programming Languages', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'],
  },
  icon: {
    type: String,
    default: '',
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 80,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Skill', skillSchema);

