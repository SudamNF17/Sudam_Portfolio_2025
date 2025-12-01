import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
  },
  image: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    default: '',
  },
  demoLink: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Project', projectSchema);

