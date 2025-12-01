import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../utils/api';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaAws,
  FaDocker,
  FaCode,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
  SiFigma,
} from 'react-icons/si';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        const apiSkills = response?.data?.data;
        if (Array.isArray(apiSkills) && apiSkills.length > 0) {
          setSkills(apiSkills);
        } else {
          setSkills(getDefaultSkills());
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback to default skills if API fails
        setSkills(getDefaultSkills());
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const getDefaultSkills = () => [
    // Programming Languages
    { name: 'JavaScript', category: 'Programming Languages', proficiency: 95 },
    { name: 'Python', category: 'Programming Languages', proficiency: 80 },
    { name: 'Java', category: 'Programming Languages', proficiency: 75 },
    { name: 'C', category: 'Programming Languages', proficiency: 70 },
    { name: 'C++', category: 'Programming Languages', proficiency: 70 },

    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 90 },
    { name: 'HTML5', category: 'Frontend', proficiency: 95 },
    { name: 'CSS3', category: 'Frontend', proficiency: 90 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92 },

    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 88 },
    { name: 'Express.js', category: 'Backend', proficiency: 85 },
    { name: 'PHP', category: 'Backend', proficiency: 75 },

    // Database
    { name: 'MongoDB', category: 'Database', proficiency: 85 },
    { name: 'MySQL', category: 'Database', proficiency: 75 },
    { name: 'SQL Server', category: 'Database', proficiency: 70 },

    // Tools
    { name: 'Git', category: 'Tools', proficiency: 90 },
    { name: 'Figma', category: 'Tools', proficiency: 90 },
    { name: 'VS Code', category: 'Tools', proficiency: 95 },
    { name: 'Eclipse', category: 'Tools', proficiency: 80 },
    { name: 'Postman', category: 'Tools', proficiency: 90 },
  ];

  const getSkillIcon = (name) => {
    const iconMap = {
      React: FaReact,
      JavaScript: SiJavascript,
      TypeScript: SiTypescript,
      'Node.js': FaNodeJs,
      'Express.js': SiExpress,
      MongoDB: SiMongodb,
      PostgreSQL: SiPostgresql,
      'Tailwind CSS': SiTailwindcss,
      Git: FaGitAlt,
      Docker: FaDocker,
      AWS: FaAws,
      Figma: SiFigma,
      Python: FaPython,
    };
    const Icon = iconMap[name] || FaCode;
    return Icon;
  };

  const categories = ['Programming Languages', 'Frontend', 'Backend', 'Database', 'Tools'];

  const groupedSkills = categories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  }));

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {groupedSkills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              data-aos="fade-up"
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-center text-white">
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, index) => {
                  const Icon = getSkillIcon(skill.name);
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                        <Icon className="text-neon-blue" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-400">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

