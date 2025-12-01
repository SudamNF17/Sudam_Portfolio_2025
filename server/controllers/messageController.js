import Message from '../models/MessageModel.js';
import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Create message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sudam17fernando@gmail.com',
      subject: `Portfolio Contact: ${req.body.subject}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Subject:</strong> ${req.body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: message 
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

