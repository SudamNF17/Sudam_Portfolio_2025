import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../utils/api';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import teaFactoryImg from '../images/tea-factory.png';
import portfolioImg from '../images/portfolio.png';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAvailableSoon, setShowAvailableSoon] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const apiProjects = response?.data?.data;
        if (Array.isArray(apiProjects) && apiProjects.length > 0) {
          setProjects(apiProjects);
        } else {
          setProjects(getDefaultProjects());
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to default projects if API fails
        setProjects(getDefaultProjects());
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getDefaultProjects = () => [
    {
      _id: '1',
      title: 'My Portfolio Website',
      description: 'A personal portfolio website built to showcase my projects, skills, experience, and achievements. Features responsive design, smooth animations, and a clean modern UI.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: portfolioImg,
      githubLink: 'https://github.com/SudamNF17/Sudam_Portfolio_2025.git',
      demoLink: '#',
      featured: true,
    },
    {
      _id: '2',
      title: 'Tea Factory Management System',
      description: 'A complete MERN-stack system designed for managing tea factory operations, including supplier management, employee management, attendance tracking, inventory handling, and sales processing. Features role-based dashboards for HR Manager, Supplier, and Wholesaler.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      image: teaFactoryImg,
      githubLink: 'https://github.com/SudamNF17/FerndaleTeaFactorySystem.git',
      demoLink: '#',
      featured: true,
    },
  
  ];

  // Helper function to get image source
  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      // If it's a string from API, check if it matches our local images
      if (image === 'portfolio.png') {
        return portfolioImg;
      }
      if (image === 'tea-factory.png' || image === 'teaFactoryImg') {
        return teaFactoryImg;
      }
      // Return as is if it's a URL or other path
      return image;
    }
    // If it's already an imported image, return it
    return image;
  };

  // Handle demo link click - show "Available Soon" for Tea Factory project
  const handleDemoClick = (e, project) => {
    e.stopPropagation();
    if (project.title === 'Tea Factory Management System' || project.title?.includes('Tea Factory')) {
      e.preventDefault();
      setShowAvailableSoon(true);
      setTimeout(() => {
        setShowAvailableSoon(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageSrc(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                {project.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <FaGithub size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleDemoClick(e, project)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-neon-purple transition-colors"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageSrc(selectedProject.image)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors"
                >
                  <FaTimes className="text-white" size={20} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg hover:scale-105 transition-transform"
                    >
                      <FaGithub size={20} />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.demoLink && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleDemoClick(e, selectedProject)}
                      className="flex items-center space-x-2 px-6 py-3 glass hover:bg-white/20 transition-colors rounded-lg"
                    >
                      <FaExternalLinkAlt size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available Soon Notification */}
      <AnimatePresence>
        {showAvailableSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="glass-dark px-8 py-4 rounded-xl shadow-2xl border border-neon-purple/30">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
                <p className="text-white font-semibold text-lg">
                  Available Soon
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

