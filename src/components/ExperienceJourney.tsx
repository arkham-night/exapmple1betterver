
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Experience {
  year: number;
  title: string;
  company: string;
  achievements: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    year: 2024,
    title: "Senior Creative Designer",
    company: "Design Studio X",
    achievements: [
      "Led brand redesign for Fortune 500 client",
      "Managed team of 5 designers",
      "Implemented design system"
    ],
    skills: ["Brand Design", "Leadership", "Design Systems"]
  },
  {
    year: 2022,
    title: "UI/UX Designer",
    company: "Tech Innovators",
    achievements: [
      "Redesigned core product interface",
      "Increased user engagement by 40%"
    ],
    skills: ["UI/UX", "Product Design", "User Research"]
  },
  {
    year: 2020,
    title: "Junior Designer",
    company: "Creative Agency",
    achievements: [
      "Created marketing materials",
      "Assisted with client presentations"
    ],
    skills: ["Graphic Design", "Marketing", "Presentation"]
  }
];

const ExperienceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.8
    });

    const spheres: THREE.Mesh[] = [];
    experiences.forEach((_, index) => {
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = (index - 1) * 2;
      sphere.position.y = Math.sin(index) * 0.5;
      scene.add(sphere);
      spheres.push(sphere);
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);

      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        sphere.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up Three.js resources
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className="min-h-screen relative py-20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 playfair gradient-text text-center"
        >
          Experience Journey
        </motion.h2>

        <div ref={containerRef} className="relative">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative flex items-center gap-8 mb-16"
            >
              <div className="w-32 text-2xl font-bold gradient-text">
                {exp.year}
              </div>
              
              <div className="flex-1 bg-creative-dark/30 backdrop-blur-sm rounded-lg p-6 border border-creative-accent/20">
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-creative-gray/80 mb-4">{exp.company}</p>
                
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-creative-accent rounded-full" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      className="px-3 py-1 rounded-full text-sm bg-creative-accent/10 border border-creative-accent/20"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceJourney;
