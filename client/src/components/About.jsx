import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: FaCode,
      title: 'Full Stack Development',
      description: 'Building end-to-end web applications with modern frameworks and best practices.',
    },
    {
      icon: FaGraduationCap,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and improving my skills through projects and courses.',
    },
    {
      icon: FaLightbulb,
      title: 'Problem Solving',
      description: 'Passionate about finding elegant solutions to complex challenges.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm an <span className="text-neon-blue font-semibold">Undergraduate Software Engineer</span> with a
                passion for creating innovative web solutions. Currently pursuing my degree while building
                real-world projects that solve problems and deliver value.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                My journey in software development started with curiosity and has evolved into a deep
                commitment to crafting clean, efficient, and user-friendly applications. I specialize in
                the MERN stack but I'm always eager to learn and adapt to new technologies.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new frameworks, contributing to open-source
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-left"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Education</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-neon-blue pl-4">
                  <h4 className="text-xl font-semibold text-white mb-1">
                    Bachelor of Science in Software Engineering
                  </h4>
                  <p className="text-neon-blue mb-2">University of Moratuwa</p>
                  <p className="text-gray-400 text-sm">2021 - Present</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple mb-4">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

