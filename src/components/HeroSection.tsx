
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-sm uppercase tracking-[0.3em] mb-6 reveal-text"
      >
        <span>Creative Designer</span>
      </motion.div>

      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-8 playfair">
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
            className="inline-block mx-[0.02em] hover:text-creative-accent transition-colors duration-300"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="flex flex-col items-center space-y-4"
      >
        <a href="mailto:hello@aryankumar.design" className="hover:text-creative-accent transition-colors duration-300">
          hello@aryankumar.design
        </a>
        <a href="tel:+919876543210" className="hover:text-creative-accent transition-colors duration-300">
          +91 98765 43210
        </a>
        <a href="https://instagram.com/artistry.aryan" target="_blank" rel="noopener noreferrer" className="hover:text-creative-accent transition-colors duration-300">
          @artistry.aryan
        </a>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-8 py-4 bg-creative-accent text-white rounded-full 
                 hover:bg-opacity-90 transition-all duration-300 
                 shadow-[0_0_20px_rgba(139,92,246,0.3)] 
                 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                 backdrop-blur-sm"
      >
        Get in Touch
      </motion.button>
    </section>
  );
};

export default HeroSection;
