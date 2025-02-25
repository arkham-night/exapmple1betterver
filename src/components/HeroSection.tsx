import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const name = "ARYAN KUMAR".split('');

  useEffect(() => {
    letterRefs.current.forEach((letter, index) => {
      if (letter) {
        letter.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  }, []);

  return (
    <section className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hero-subtitle"
      >
        <span>Creative Designer</span>
      </motion.div>

      <h1 className="hero-title">
        {name.map((letter, index) => (
          <motion.span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="hero-letter"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="contact-info"
      >
        <a href="mailto:hello@aryankumar.design" className="contact-link">
          hello@aryankumar.design
        </a>
        <a href="tel:+919876543210" className="contact-link">
          +91 98765 43210
        </a>
        <a href="https://instagram.com/artistry.aryan" target="_blank" rel="noopener noreferrer" className="contact-link">
          @artistry.aryan
        </a>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="get-in-touch-button"
      >
        Get in Touch
      </motion.button>
    </section>
  );
};

export default HeroSection;