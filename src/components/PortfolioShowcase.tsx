
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

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
    <section className="min-h-screen py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 playfair gradient-text text-center">
          Portfolio Showcase
        </h2>
        
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={projectVariants}
              viewport={{ once: true }}
              className="relative group"
            >
              <div 
                className={`
                  relative overflow-hidden rounded-lg aspect-[4/3] bg-creative-dark
                  before:absolute before:inset-0 before:bg-gradient-to-b 
                  before:from-transparent before:to-creative-dark/80 before:z-10
                `}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2 playfair">{project.title}</h3>
                  <p className="text-creative-gray/80">{project.description}</p>
                </div>
                <div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
