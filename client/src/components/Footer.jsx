import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:sudam17fernando@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-center md:text-left">
            <p>
              © {currentYear} <span className="text-neon-blue font-semibold">Sudam Navoda Fernando</span>. All rights reserved.
            </p>
            <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
              Made with <FaHeart className="text-red-500 mx-1" size={14} /> using React & Node.js
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="text-gray-400 hover:text-neon-blue transition-colors" size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

