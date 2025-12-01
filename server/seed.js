import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Project from './models/ProjectModel.js';
import Skill from './models/SkillModel.js';
import Experience from './models/ExperienceModel.js';
import { projects, skills, experiences } from './data/seedData.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});

    // Insert new data
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences);

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

