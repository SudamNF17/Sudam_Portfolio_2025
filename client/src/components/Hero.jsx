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
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sudamfernando', color: 'hover:text-blue-400' },
    { icon: FaEnvelope, href: 'mailto:sudam17fernando@gmail.com', color: 'hover:text-red-400' },
  ];

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#080a12_5%,#0c1222_48%,#080a12_100%)]" />
      <div className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:4rem_4rem]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(0, 217, 255, 0.1), transparent 50%)`,
        }}
      />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <p className="eyebrow">Software engineering student · Sri Lanka</p>
            <motion.h1
              className="mb-4 text-5xl font-extrabold leading-[.98] tracking-tight md:text-7xl"
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
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-slate-300 md:text-3xl">
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
            className="max-w-xl text-base leading-8 text-slate-400 md:text-lg lg:mx-0 mb-9"
          >
            Crafting beautiful and functional web experiences with modern technologies.
            Passionate about clean code, user experience, and continuous learning.
          </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-3 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Social profile"
                  className={`surface rounded-xl p-3.5 ${social.color} surface-hover transition-colors`}
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
                href="/SudamFernando CV.pdf"
                download="Sudam_Navoda_Fernando_CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary"
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
                aria-label="Scroll to about section"
                className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:bg-white/10"
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
            <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-[25rem] lg:w-[25rem]">
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink opacity-80 blur-2xl animate-pulse" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl shadow-black/40">
                <img
                  src={profileImg}
                  alt="Sudam Navoda Fernando"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300">Undergraduate software engineer</p>
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

