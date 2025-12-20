import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Experience from './models/ExperienceModel.js';

dotenv.config();

const addMissingExperience = async () => {
  try {
    await connectDB();

    const newExperience = {
      title: 'Cybersecurity Best Practices certificate',
      company: 'Coursera',
      type: 'Certificate',
      description: 'Cybersecurity Best Practices" is a transformative course designed for any learners whether they are just getting started with cybersecurity or are seasoned professionals looking for a refresher. This course uses real world examples and explains cybersecurity concepts in relatable ways to make it accessible for anyone while still challenging seasoned professionals to think of these concepts with a different lens.',
      startDate: '2025-12-11',
      certificateLink: '/Cyber_secuirity_best_practices_coursera.pdf'
    };

    // Check if it already exists
    const exists = await Experience.findOne({ 
      title: newExperience.title,
      company: newExperience.company 
    });

    if (exists) {
      console.log('✅ Experience already exists in database');
    } else {
      await Experience.create(newExperience);
      console.log('✅ New experience added successfully!');
    }

    // Show all experiences
    const allExperiences = await Experience.find().sort({ startDate: -1 });
    console.log(`\n📋 Total experiences in database: ${allExperiences.length}`);
    allExperiences.forEach((exp, index) => {
      console.log(`${index + 1}. ${exp.title} - ${exp.company}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addMissingExperience();

