import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { validateProject } from '../middleware/validation.js';

const router = express.Router();

router.route('/').get(getProjects).post(validateProject, createProject);
router.route('/:id').get(getProject).put(validateProject, updateProject).delete(deleteProject);

export default router;

