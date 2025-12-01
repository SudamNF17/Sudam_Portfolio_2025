import { useState, useEffect } from 'react';

const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 50, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (!isDeleting && currentText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1);
          } else {
            return currentWord.slice(0, prev.length + 1);
          }
        });
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="text-gradient">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;

