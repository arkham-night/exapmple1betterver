
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleField from '@/components/ParticleField';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import SkillVisualization from '@/components/SkillVisualization';
import ExperienceJourney from '@/components/ExperienceJourney';

const Index = () => {
  useEffect(() => {
    // Prevent default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen"
    >
      <CustomCursor />
      <ParticleField />
      <HeroSection />
      <PortfolioShowcase />
      <SkillVisualization />
      <ExperienceJourney />
    </motion.div>
  );
};

export default Index;
