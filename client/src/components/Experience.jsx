import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getExperiences } from '../utils/api';
import { FaBriefcase, FaGraduationCap, FaCertificate, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        setExperiences(response.data.data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        // Fallback to default experiences if API fails
        setExperiences(getDefaultExperiences());
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const getDefaultExperiences = () => [
    {
      _id: '1',
      title: 'Bachelor of Science in Software Engineering',
      company: 'University of Moratuwa',
      type: 'Education',
      description: 'Pursuing undergraduate degree in Software Engineering with focus on full-stack development, software architecture, and modern web technologies.',
      startDate: '2021-09-01',
      current: true,
      location: 'Moratuwa, Sri Lanka',
    },
    {
      _id: '2',
      title: 'Full Stack Developer Intern',
      company: 'Tech Solutions Inc.',
      type: 'Internship',
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with team members on agile projects and learned industry best practices.',
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      location: 'Colombo, Sri Lanka',
    },
    {
      _id: '3',
      title: 'AWS Certified Cloud Practitioner',
      company: 'Amazon Web Services',
      type: 'Certificate',
      description: 'Certified in AWS cloud fundamentals including cloud concepts, security, architecture, pricing, and support.',
      startDate: '2023-03-15',
      certificateLink: 'https://www.credly.com/badges/aws-certified',
    },
    {
      _id: '4',
      title: 'Meta Front-End Developer Certificate',
      company: 'Meta (Coursera)',
      type: 'Certificate',
      description: 'Completed comprehensive front-end development program covering React, JavaScript, HTML, CSS, and responsive design principles.',
      startDate: '2023-01-10',
      certificateLink: 'https://www.coursera.org/certificates/meta-front-end-developer',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'Work':
      case 'Internship':
        return FaBriefcase;
      case 'Education':
        return FaGraduationCap;
      case 'Certificate':
        return FaCertificate;
      default:
        return FaBriefcase;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Experience & Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const Icon = getIcon(exp.type);
                return (
                  <motion.div
                    key={exp._id || index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    data-aos="fade-right"
                    className="relative pl-20"
                  >
                    {/* Icon */}
                    <div className="absolute left-0 top-0 p-3 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple">
                      <Icon className="text-white" size={24} />
                    </div>

                    {/* Content */}
                    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-neon-blue font-semibold mb-2">{exp.company}</p>
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt size={14} />
                          <span>
                            {formatDate(exp.startDate)}
                            {exp.current ? ' - Present' : exp.endDate ? ` - ${formatDate(exp.endDate)}` : ''}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt size={14} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>

                      {exp.certificateLink && (
                        <a
                          href={exp.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-neon-blue hover:text-neon-purple transition-colors"
                        >
                          View Certificate →
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

