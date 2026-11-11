import Message from '../models/MessageModel.js';

// @desc    Create message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const savedMessage = await Message.create(req.body);

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public (in production, add auth middleware)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

