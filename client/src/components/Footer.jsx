import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/SudamNF17', label: 'GitHub' },
    { icon: FaLinkedin, href: 'www.linkedin.com/in/sudam-fernando-063171270', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:sudam17fernando@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-center md:text-left">
            <p>
              Copyright © {currentYear} - <span className="text-neon-blue font-semibold"></span>All rights reserved by Sudam Navoda Fernando.
            </p>
            <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
              
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

