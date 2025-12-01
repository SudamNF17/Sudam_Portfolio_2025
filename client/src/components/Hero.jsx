import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa';
import Typewriter from './Typewriter';
import profileImg from '../images/sudam.jpeg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/SudamNF17', color: 'hover:text-gray-400' },
    { icon: FaLinkedin, href: 'www.linkedin.com/in/sudam-fernando-063171270', color: 'hover:text-blue-400' },
    { icon: FaEnvelope, href: 'mailto:sudam17fernando@gmail.com', color: 'hover:text-red-400' },
  ];

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(0, 217, 255, 0.1), transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] items-center">
          <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">Sudam Navoda Fernando</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-4">
              <Typewriter
                words={[
                  'Undergraduate Software Engineering Student',
                  'Full Stack Developer',
                  'React Enthusiast',
                  'Problem Solver',
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                delay={2000}
              />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Crafting beautiful and functional web experiences with modern technologies.
            Passionate about clean code, user experience, and continuous learning.
          </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full glass ${social.color} transition-colors`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="/cv.pdf"
                download="Sudam_Navoda_Fernando_CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
              >
                <FaDownload size={18} />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.button
                onClick={scrollToAbout}
                whileHover={{ scale: 1.1, y: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full glass hover:bg-white/20 transition-colors"
              >
                <FaArrowDown className="text-neon-blue animate-bounce" size={24} />
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink opacity-80 blur-2xl animate-pulse" />
              <div className="relative h-full w-full rounded-[30px] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg shadow-2xl">
                <img
                  src={profileImg}
                  alt="Sudam Navoda Fernando"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Undergraduate Software Engineering Student</p>
                  <p className="text-lg font-semibold text-white">Sudam Navoda Fernando</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

