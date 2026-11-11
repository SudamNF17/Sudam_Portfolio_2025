import { body, validationResult } from 'express-validator';

export const validateProject = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('techStack').isArray().withMessage('Tech stack must be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validateMessage = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name is too long'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 150 }).withMessage('Subject is too long'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }).withMessage('Message is too long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

