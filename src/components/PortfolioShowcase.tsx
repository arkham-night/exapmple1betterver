import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './PortfolioShowcase.css';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity",
    image: "/placeholder.svg",
    description: "Complete brand identity design"
  },
  {
    id: 2,
    title: "Digital Art",
    image: "/placeholder.svg",
    description: "Experimental digital artwork series"
  },
  {
    id: 3,
    title: "UI/UX Design",
    image: "/placeholder.svg",
    description: "Mobile app interface design"
  }
];

const PortfolioShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(null);

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="portfolio-showcase">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="portfolio-container"
      >
        <h2 className="portfolio-title">
          Portfolio Showcase
        </h2>
        
        <div ref={containerRef} className="work-samples">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={projectVariants}
              viewport={{ once: true }}
              className="work-sample"
            >
              <div className="work-sample-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="work-sample-image"
                />
                <div className="work-sample-overlay">
                  <h3 className="work-sample-title">{project.title}</h3>
                  <p className="work-sample-description">{project.description}</p>
                </div>
                <div
                  className="work-sample-shadow"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      hoveredProject === project.id ? '#FF3366' : '#FFD700'
                    }22 0%, transparent 70%)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioShowcase;