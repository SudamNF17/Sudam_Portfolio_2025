import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-dark shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient"
          >
            SN<span className="text-neon-blue">F</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-neon-blue transition-colors cursor-pointer"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" size={20} />
              ) : (
                <FaMoon className="text-blue-400" size={20} />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full glass"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" size={18} />
              ) : (
                <FaMoon className="text-blue-400" size={18} />
              )}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full glass"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-white" size={20} />
              ) : (
                <FaBars className="text-white" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 space-y-3"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block text-gray-300 hover:text-neon-blue transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

