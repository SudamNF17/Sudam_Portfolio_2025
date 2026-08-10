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
    <section id="about" className="section-shell relative">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="eyebrow">A little more about me</p>
          <h2 className="section-title">Building with purpose.</h2>
        </motion.div>

        <div className="mb-12 grid items-stretch gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
          >
            <div className="surface surface-hover h-full rounded-3xl p-7 md:p-8">
              <h3 className="mb-5 text-2xl font-bold text-white">Who I Am</h3>
              <p className="mb-4 leading-7 text-slate-300">
                I'm an <span className="text-neon-blue font-semibold">Undergraduate Software Engineering Student</span> with a strong passion for building modern and impactful web applications. As I pursue my degree, I continuously work on real-world projects that solve problems, improve user experiences, and add meaningful value.
              </p>
              <p className="mb-4 leading-7 text-slate-300">
                My journey in software development began with curiosity and has grown into a commitment to writing clean, efficient, and user-friendly code. I have hands-on experience with the MERN stack, and I’m always eager to explore new technologies, tools, and best practices.
              </p>
              <p className="leading-7 text-slate-300">
               Beyond coding, I enjoy learning new frameworks, improving my skills through self-projects, and sharing knowledge within the developer community. I aim to grow as a full-stack developer and contribute to innovative tech solutions.
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
            <div className="surface surface-hover h-full rounded-3xl p-7 md:p-8">
              <p className="eyebrow">Currently</p>
              <h3 className="mb-5 text-2xl font-bold text-white">Education</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-300 pl-5">
                  <h4 className="mb-2 text-xl font-semibold leading-snug text-white">
                    BSc (Hons) in IT, specializing in Software Engineering
                  </h4>
                  <p className="mb-2 text-cyan-300">Sri Lanka Institute of Information Technology (SLIIT)</p>
                  <p className="font-mono text-sm text-slate-400">2024 — Present</p>

                  
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
              className="surface surface-hover rounded-2xl p-6 text-center"
            >
              <div className="mb-4 inline-block rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 p-3.5">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="leading-6 text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

