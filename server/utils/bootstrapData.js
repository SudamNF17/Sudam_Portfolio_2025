import Project from '../models/ProjectModel.js';
import Skill from '../models/SkillModel.js';
import Experience from '../models/ExperienceModel.js';
import { projects, skills, experiences } from '../data/seedData.js';

const insertIfEmpty = async (Model, data, label) => {
  const count = await Model.countDocuments();
  if (count === 0) {
    await Model.insertMany(data);
    console.log(`🔄 Seeded default ${label} data`);
    return true;
  }
  console.log(`✅ ${label} already present (${count} records)`);
  return false;
};

export const ensureSeedData = async () => {
  try {
    await Promise.all([
      insertIfEmpty(Project, projects, 'projects'),
      insertIfEmpty(Skill, skills, 'skills'),
      insertIfEmpty(Experience, experiences, 'experiences'),
    ]);
  } catch (error) {
    console.error('❌ Failed to bootstrap default data:', error.message);
    throw error;
  }
};


