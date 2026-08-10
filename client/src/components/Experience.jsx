import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getExperiences } from '../utils/api';
import { FaBriefcase, FaGraduationCap, FaCertificate, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        const apiExperiences = response?.data?.data;
        if (Array.isArray(apiExperiences) && apiExperiences.length > 0) {
          setExperiences(sortExperiences(apiExperiences));
        } else {
          setExperiences(sortExperiences(getDefaultExperiences()));
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        // Fallback to default experiences if API fails
        setExperiences(sortExperiences(getDefaultExperiences()));
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Sort experiences: Bachelor first, Advanced Level last, certificates in between
  const sortExperiences = (exps) => {
    const bachelorId = '1'; // Bachelor of Science ID
    const advancedLevelId = '5'; // Advanced Level ID
    
    const bachelor = exps.find(exp => exp._id === bachelorId || 
      (exp.title && exp.title.includes('Bachelor of Science') && exp.company === 'SLIIT'));
    const advancedLevel = exps.find(exp => exp._id === advancedLevelId || 
      (exp.title && exp.title.includes('Advanced Level') && exp.company === 'Loyola College Bopitiya'));
    const certificates = exps.filter(exp => 
      exp.type === 'Certificate' && 
      exp._id !== bachelorId && 
      exp._id !== advancedLevelId &&
      !(exp.title && exp.title.includes('Bachelor of Science')) &&
      !(exp.title && exp.title.includes('Advanced Level'))
    );
    const otherEducation = exps.filter(exp => 
      exp.type === 'Education' && 
      exp._id !== bachelorId && 
      exp._id !== advancedLevelId &&
      !(exp.title && exp.title.includes('Bachelor of Science')) &&
      !(exp.title && exp.title.includes('Advanced Level'))
    );
    
    // Sort certificates by date (newest first)
    certificates.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    // Combine: Bachelor first, then certificates, then other education, then Advanced Level last
    const sorted = [];
    if (bachelor) sorted.push(bachelor);
    sorted.push(...certificates);
    sorted.push(...otherEducation);
    if (advancedLevel) sorted.push(advancedLevel);
    
    return sorted;
  };

  const getDefaultExperiences = () => [
    {
      _id: '1',
      title: 'Bachelor of Science Honours-information technolodgy specialized in Software Engineering',
      company: 'SLIIT',
      type: 'Education',
      description: 'Pursuing undergraduate degree in Software Engineering with focus on full-stack development, software architecture, and modern web technologies.',
      startDate: '2023-09-21',
      current: true,
      location: 'Malabe, Sri Lanka',
    },
    {
      _id: '4',
      title: 'Online learning programme in python certificate',
      company: 'University of Moratuwa',
      type: 'Certificate',
      description: 'Successfully completed a beginner-level Python course, learning core programming concepts, syntax, and practical coding exercises to build foundational skills.',
      startDate: '2023-04-20',
      certificateLink: '/Python_for_Beginners_E-Certificate.pdf',
    },
    {
      _id: '6',
      title: 'Cybersecurity Best Practices certificate',
      company: 'Coursera',
      type: 'Certificate',
      description: 'Cybersecurity Best Practices" is a transformative course designed for any learners whether they are just getting started with cybersecurity or are seasoned professionals looking for a refresher. This course uses real world examples and explains cybersecurity concepts in relatable ways to make it accessible for anyone while still challenging seasoned professionals to think of these concepts with a different lens.',
      startDate: '2025-12-11',
      certificateLink: '/Cyber_secuirity_best_practices_coursera.pdf'
    },
    {
      _id: '7',
      title: 'GenAI for Cybersecurity Analysts',
      company: 'Coursera',
      type: 'Certificate',
      description: 'This course explores how Generative Artificial Intelligence (GenAI) is revolutionizing cybersecurity. Through a blend of discussions, video demos, and guided hands-on activities, you will learn how to leverage GenAI tools to enhance your productivity in threat detection, risk mitigation, security testing, and more.',
      startDate: '2025-12-14',
      certificateLink: '/gen_ai_for_cyber_secuirity.pdf'
    },
    {
      _id: '8',
      title: 'Exploring Emerging Technologies for Lifelong Learning and Success',
      company: ' State University of New York and offered through Coursera',
      type: 'Certificate',
      description: 'Including value and implications of using established and emerging technology tools for personal and professional growth.',
      startDate: '2023-11-1',
      certificateLink: '/lifelong_learning_and_success.pdf'
    },
    {
      _id: '5',
      title: 'Advanced Level Examination',
      company: 'Loyola College Bopitiya',
      type: 'Education',
      description: 'Completed my secondary education in the Commerce stream, achieving strong grades in ICT, Account, Business Studies, and English (B, A, A, B). ',
      startDate: '2020-01-20',
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

  // Separate experiences into categories
  const getExperienceCategories = () => {
    const bachelor = experiences.find(exp => 
      exp.title && exp.title.includes('Bachelor of Science') && exp.company === 'SLIIT'
    );
    const advancedLevel = experiences.find(exp => 
      exp.title && exp.title.includes('Advanced Level') && exp.company === 'Loyola College Bopitiya'
    );
    const certificates = experiences.filter(exp => 
      exp.type === 'Certificate' &&
      !(exp.title && exp.title.includes('Bachelor of Science')) &&
      !(exp.title && exp.title.includes('Advanced Level'))
    ).sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // Sort by date, newest first
    const otherEducation = experiences.filter(exp => 
      exp.type === 'Education' &&
      !(exp.title && exp.title.includes('Bachelor of Science')) &&
      !(exp.title && exp.title.includes('Advanced Level'))
    );

    return { bachelor, certificates, otherEducation, advancedLevel };
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

  const { bachelor, certificates, otherEducation, advancedLevel } = getExperienceCategories();
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 3);
  const hasMoreCertificates = certificates.length > 3;

  const renderExperienceItem = (exp, index) => {
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
  };

  return (
    <section id="experience" className="section-shell relative">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="eyebrow">Learning journey</p>
          <h2 className="section-title">Experience & education.</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-cyan-300 via-violet-500 to-transparent" />

            <div className="space-y-8">
              {/* Bachelor of Science - Always First */}
              {bachelor && renderExperienceItem(bachelor, 0)}

              {/* Certificates - Show 3 initially, then all when expanded */}
              {displayedCertificates.map((exp, index) => 
                renderExperienceItem(exp, index + 1)
              )}

              {/* Other Education Items */}
              {otherEducation.map((exp, index) => 
                renderExperienceItem(exp, displayedCertificates.length + index + 1)
              )}

              {/* Advanced Level - Always Last */}
              {advancedLevel && renderExperienceItem(
                advancedLevel, 
                displayedCertificates.length + otherEducation.length + 1
              )}

              {/* See More/See Less Button for Certificates - Always at the very end */}
              {hasMoreCertificates && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-6"
                >
                  <motion.button
                    onClick={() => setShowAllCertificates(!showAllCertificates)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
                  >
                    {showAllCertificates ? (
                      <>
                        <FaChevronUp />
                        <span>See Less</span>
                      </>
                    ) : (
                      <>
                        <FaChevronDown />
                        <span>See More ({certificates.length - 3} more)</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

