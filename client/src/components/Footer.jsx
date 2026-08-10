import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/SudamNF17', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sudamfernando', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:sudam17fernando@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="site-container">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-center text-sm text-slate-400 md:text-left">
            © {currentYear} Sudam Navoda Fernando. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="surface rounded-xl p-3 transition-colors hover:border-cyan-300/30 hover:bg-white/10"
                aria-label={social.label}
              >
                <social.icon className="text-slate-400 transition-colors hover:text-cyan-300" size={19} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
