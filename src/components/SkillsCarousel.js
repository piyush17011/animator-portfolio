import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  "3D Modeling",
  "Animation",
  "Motion Design",
  "Character Rigging",
  "Visual Effects",
  "Blender",
  "Maya",
  "After Effects",
  "Concept Art",
  "Storyboarding",
];

const SkillsCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-rotate skills every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentSkill = skills[current % skills.length];

  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute -inset-8 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(77, 216, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Carousel container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Single skill display */}
        <motion.div
          key={`${currentSkill}-${current}`}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="px-8 py-4 rounded-lg border border-ember bg-ember/10 shadow-lg shadow-ember/20">
            <motion.span
              className="font-heading font-bold text-center block whitespace-nowrap text-ember text-2xl"
              animate={{
                letterSpacing: "0.05em",
              }}
              transition={{ duration: 0.6 }}
            >
              {currentSkill}
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Progress indicator dots */}
      <div className="absolute -bottom-16 flex gap-2">
        {skills.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-ember" : "w-2 bg-border-dim"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to skill ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
