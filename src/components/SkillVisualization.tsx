
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Circle, LucideProps } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'adobe' | '3d' | 'typography' | 'motion';
  description: string;
}

const skills: Skill[] = [
  { name: "Photoshop", level: 95, category: "adobe", description: "Advanced photo manipulation" },
  { name: "Illustrator", level: 90, category: "adobe", description: "Vector art mastery" },
  { name: "After Effects", level: 85, category: "adobe", description: "Motion graphics expert" },
  { name: "Blender", level: 80, category: '3d', description: "3D modeling & animation" },
  { name: "Cinema 4D", level: 75, category: '3d', description: "Motion design & visualization" },
  { name: "Typography", level: 88, category: "typography", description: "Custom type design" },
  { name: "Motion Design", level: 92, category: "motion", description: "Kinetic typography" }
];

const SkillVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSkill, setActiveSkill] = React.useState<Skill | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawColorWheel = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = getSkillColor(skill.category);
        ctx.fill();

        // Draw connection lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${getSkillColor(skill.category)}44`;
        ctx.stroke();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawColorWheel();
      requestAnimationFrame(animate);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'adobe':
        return '#8B5CF6';
      case '3d':
        return '#06B6D4';
      case 'typography':
        return '#10B981';
      case 'motion':
        return '#F59E0B';
      default:
        return '#8B5CF6';
    }
  };

  return (
    <section className="min-h-screen py-20 relative overflow-hidden bg-creative-dark">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 playfair gradient-text text-center">
          Skill Matrix
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </div>

          <div className="space-y-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{skill.name}</h3>
                  <span className="text-sm text-creative-gray/80">{skill.level}%</span>
                </div>
                <div className="h-2 bg-creative-dark/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${getSkillColor(skill.category)}88, ${getSkillColor(skill.category)})`
                    }}
                  />
                </div>
                {activeSkill?.name === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-2 p-2 bg-creative-dark/90 rounded text-sm"
                  >
                    {skill.description}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillVisualization;
