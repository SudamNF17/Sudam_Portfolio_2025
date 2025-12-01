import Experience from '../models/ExperienceModel.js';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

