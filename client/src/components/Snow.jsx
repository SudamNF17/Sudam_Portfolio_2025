import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Snow = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    // Update on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Create 50 snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 4 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.7,
      drift: Math.random() * 50 - 25,
    }));
    setSnowflakes(flakes);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
          }}
          initial={{ y: -20, x: 0 }}
          animate={{
            y: windowHeight + 20,
            x: [0, flake.drift, flake.drift * 0.5],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  );
};

export default Snow;

