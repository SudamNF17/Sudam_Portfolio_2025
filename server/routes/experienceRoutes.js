import express from 'express';
import { getExperiences } from '../controllers/experienceController.js';

const router = express.Router();

router.route('/').get(getExperiences);

export default router;

