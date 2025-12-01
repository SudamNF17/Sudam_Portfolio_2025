import express from 'express';
import { createMessage, getMessages } from '../controllers/messageController.js';
import { validateMessage } from '../middleware/validation.js';

const router = express.Router();

router.route('/').post(validateMessage, createMessage).get(getMessages);

export default router;

