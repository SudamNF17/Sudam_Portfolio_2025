import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Project from './models/ProjectModel.js';
import Skill from './models/SkillModel.js';
import Experience from './models/ExperienceModel.js';

dotenv.config();

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with modern technologies for optimal performance and user experience.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    githubLink: 'https://github.com/sudam17/ecommerce-platform',
    demoLink: 'https://ecommerce-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Helps teams stay organized and productive.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    githubLink: 'https://github.com/sudam17/task-manager',
    demoLink: 'https://taskmanager-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and weather maps. Features location-based weather data and interactive charts.',
    techStack: ['React', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
    githubLink: 'https://github.com/sudam17/weather-dashboard',
    demoLink: 'https://weather-demo.vercel.app',
    featured: false,
  },
  {
    title: 'Social Media Analytics',
    description: 'An analytics dashboard for social media metrics with data visualization, trend analysis, and reporting features. Helps businesses track their social media performance.',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Express'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    githubLink: 'https://github.com/sudam17/social-analytics',
    demoLink: 'https://analytics-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Recipe Finder App',
    description: 'A recipe discovery application with search functionality, ingredient-based filtering, and detailed cooking instructions. Includes meal planning and shopping list features.',
    techStack: ['React', 'Spoonacular API', 'Redux', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    githubLink: 'https://github.com/sudam17/recipe-finder',
    demoLink: 'https://recipe-demo.vercel.app',
    featured: false,
  },
  {
    title: 'Chat Application',
    description: 'A real-time chat application with multiple rooms, file sharing, and emoji support. Built with WebSocket technology for instant messaging capabilities.',
    techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800',
    githubLink: 'https://github.com/sudam17/chat-app',
    demoLink: 'https://chat-demo.vercel.app',
    featured: true,
  },
];

const skills = [
  { name: 'React', category: 'Frontend', proficiency: 90 },
  { name: 'JavaScript', category: 'Frontend', proficiency: 95 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 85 },
  { name: 'HTML5', category: 'Frontend', proficiency: 95 },
  { name: 'CSS3', category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92 },
  { name: 'Node.js', category: 'Backend', proficiency: 88 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  { name: 'Python', category: 'Backend', proficiency: 80 },
  { name: 'MongoDB', category: 'Database', proficiency: 85 },
  { name: 'PostgreSQL', category: 'Database', proficiency: 80 },
  { name: 'MySQL', category: 'Database', proficiency: 75 },
  { name: 'Git', category: 'Tools', proficiency: 90 },
  { name: 'Docker', category: 'Tools', proficiency: 75 },
  { name: 'AWS', category: 'Tools', proficiency: 70 },
  { name: 'Figma', category: 'Tools', proficiency: 80 },
];

const experiences = [
  {
    title: 'Bachelor of Science in Software Engineering',
    company: 'University of Moratuwa',
    type: 'Education',
    description: 'Pursuing undergraduate degree in Software Engineering with focus on full-stack development, software architecture, and modern web technologies.',
    startDate: new Date('2021-09-01'),
    current: true,
    location: 'Moratuwa, Sri Lanka',
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Tech Solutions Inc.',
    type: 'Internship',
    description: 'Developed and maintained web applications using React and Node.js. Collaborated with team members on agile projects and learned industry best practices.',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-12-31'),
    location: 'Colombo, Sri Lanka',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    company: 'Amazon Web Services',
    type: 'Certificate',
    description: 'Certified in AWS cloud fundamentals including cloud concepts, security, architecture, pricing, and support.',
    startDate: new Date('2023-03-15'),
    certificateLink: 'https://www.credly.com/badges/aws-certified',
  },
  {
    title: 'Meta Front-End Developer Certificate',
    company: 'Meta (Coursera)',
    type: 'Certificate',
    description: 'Completed comprehensive front-end development program covering React, JavaScript, HTML, CSS, and responsive design principles.',
    startDate: new Date('2023-01-10'),
    certificateLink: 'https://www.coursera.org/certificates/meta-front-end-developer',
  },
];

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

