import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

/**
 * ProjectCard — 3D tilt + overlay on hover using GSAP
 * Uses pointer events to calculate tilt angle from card center
 */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    // Glare effect follows mouse
    if (glareRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      gsap.to(glareRef.current, {
        background: `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        duration: 0.3,
      });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.03, duration: 0.3, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.5, ease: "power3.out",
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    if (glareRef.current) {
      gsap.to(glareRef.current, { background: "transparent", duration: 0.3 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/project/${project.id}`}>
        <div
          ref={cardRef}
          className="relative rounded-sm overflow-hidden cursor-none"
          style={{ transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-card-bg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Hover overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 flex items-center justify-center opacity-0"
              style={{ background: "rgba(5,5,8,0.75)" }}
            >
              <span
                className="font-heading font-bold text-sm tracking-widest uppercase px-6 py-3 border border-ember text-ember"
                style={{ letterSpacing: "0.2em" }}
              >
                View Project
              </span>
            </div>

            {/* Glare layer */}
            <div ref={glareRef} className="absolute inset-0 pointer-events-none" />

            {/* Category chip */}
            <div className="absolute top-3 left-3">
              <span
                className="font-mono text-xs px-3 py-1 rounded-full"
                style={{
                  background: `${project.color}22`,
                  color: project.color,
                  border: `1px solid ${project.color}44`,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Card footer */}
          <div className="p-5 bg-card-bg border border-border-dim border-t-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading font-bold text-lg text-platinum mb-1">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-slate leading-relaxed line-clamp-2">
                  {project.shortDesc}
                </p>
              </div>
              <span className="font-mono text-xs text-slate shrink-0 mt-1">
                {project.year}
              </span>
            </div>

            {/* Tool pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs px-2.5 py-1 bg-void border border-border-dim text-slate rounded-sm"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="font-mono text-xs px-2.5 py-1 text-slate">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
