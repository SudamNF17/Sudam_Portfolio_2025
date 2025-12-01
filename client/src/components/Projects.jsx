import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../utils/api';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

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
      title: 'E-Commerce',
      description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      githubLink: 'https://github.com/sudam17/ecommerce-platform',
      demoLink: 'https://ecommerce-demo.vercel.app',
      featured: true,
    },
    {
      _id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      techStack: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      githubLink: 'https://github.com/sudam17/task-manager',
      demoLink: 'https://taskmanager-demo.vercel.app',
      featured: true,
    },
    {
      _id: '3',
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and weather maps.',
      techStack: ['React', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      githubLink: 'https://github.com/sudam17/weather-dashboard',
      demoLink: 'https://weather-demo.vercel.app',
      featured: false,
    },
    {
      _id: '4',
      title: 'Social Media Analytics',
      description: 'An analytics dashboard for social media metrics with data visualization, trend analysis, and reporting features.',
      techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Express'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      githubLink: 'https://github.com/sudam17/social-analytics',
      demoLink: 'https://analytics-demo.vercel.app',
      featured: true,
    },
    {
      _id: '5',
      title: 'Recipe Finder App',
      description: 'A recipe discovery application with search functionality, ingredient-based filtering, and detailed cooking instructions.',
      techStack: ['React', 'Spoonacular API', 'Redux', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
      githubLink: 'https://github.com/sudam17/recipe-finder',
      demoLink: 'https://recipe-demo.vercel.app',
      featured: false,
    },
    {
      _id: '6',
      title: 'Chat Application',
      description: 'A real-time chat application with multiple rooms, file sharing, and emoji support.',
      techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800',
      githubLink: 'https://github.com/sudam17/chat-app',
      demoLink: 'https://chat-demo.vercel.app',
      featured: true,
    },
  ];

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
                  src={project.image}
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
                      onClick={(e) => e.stopPropagation()}
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
                  src={selectedProject.image}
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
    </section>
  );
};

export default Projects;

