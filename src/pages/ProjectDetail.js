import React, { useEffect, useRef, Suspense } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import { getById, projects } from "../data/projects";

const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  // Prevent ThreeHero from running while ModelViewer is active
  // — avoids WebGL context loss on mobile (browsers cap active contexts)
  useEffect(() => {
    document.body.setAttribute("data-no-three", "true");
    return () => document.body.removeAttribute("data-no-three");
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getById(id);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);

  // Find prev / next projects for navigation
  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  useEffect(() => {
    if (!project) return;

    // Parallax on hero image
    gsap.to(heroRef.current?.querySelector(".hero-img"), {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Title slides up on scroll
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      }
    );

    // Content sections fade in staggered
    const sections = contentRef.current?.querySelectorAll(".content-block");
    sections?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: i * 0.1,
        }
      );
    });

    // Gallery images cascade in
    const imgs = galleryRef.current?.querySelectorAll(".gallery-img");
    imgs?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          delay: i * 0.12,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-slate">Project not found.</p>
        <Link to="/" className="text-ember font-heading font-bold hover:underline">
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* ── Back button ── */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 pt-24 pb-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-mono text-xs text-slate hover:text-ember transition-colors group"
          >
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </motion.div>
      </div>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
        {/* Parallax image — object-position keeps subject centered vertically */}
        <div className="hero-img absolute inset-0 scale-110">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
        {/* Dark vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 100%)",
          }}
        />

        {/* Hero title */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
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
              <span className="font-mono text-xs text-slate">{project.year}</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] text-platinum leading-none">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main description */}
          <div className="lg:col-span-2">
            <div ref={titleRef}>
              <p className="font-mono text-xs text-ember tracking-widest uppercase mb-4">Overview</p>
              <p className="font-body text-slate-light text-lg leading-relaxed content-block">
                {project.description}
              </p>
              <p className="font-body text-slate leading-relaxed mt-5 content-block">
                This project required deep collaboration between creative direction, technical
                implementation, and post-production — synthesizing everything from concept
                sketches through final delivery. Each stage was documented and iterated with
                stakeholder feedback to ensure the final result met both artistic and functional goals.
              </p>
            </div>

            {/* 3D Model Viewer */}
            {project.model && (
              <motion.div
                className="mt-12 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-mono text-xs text-slate tracking-widest uppercase mb-4">3D Model — Interactive</p>
               <div className="relative border border-border-dim bg-card-bg overflow-hidden" style={{ height: "500px" }}>
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-xs text-slate animate-pulse">Loading model...</span>
                    </div>
                  }>
                    <ModelViewer modelPath={project.model} />
                  </Suspense>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="font-mono text-xs text-slate bg-void px-3 py-1.5 border border-border-dim">drag to rotate · scroll to zoom</span>
                  </div>
                </div>
              </motion.div>
            )}

            {!project.model && project.id === "jett-valorant" && (
              <motion.div
                className="mt-12 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-mono text-xs text-slate tracking-widest uppercase mb-4">3D Model — Coming Soon</p>
                <div className="relative border border-dashed border-ember border-opacity-30 bg-card-bg flex flex-col items-center justify-center gap-4" style={{ height: "300px" }}>
                  <motion.div className="w-16 h-16 border-2 border-ember" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ borderRadius: "4px" }} />
                  <p className="font-mono text-xs text-slate tracking-widest">Interactive 3D viewer coming soon</p>
                </div>
              </motion.div>
            )}

            {/* Video embed if available */}
            {project.video && (
              <motion.div
                className="mt-12 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-mono text-xs text-slate tracking-widest uppercase mb-4">Project Video</p>
                <div className="relative aspect-video bg-card-bg border border-border-dim overflow-hidden">
                  <video
                    src={project.video}
                    controls
                    className="w-full h-full object-cover"
                    poster={project.thumbnail}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tools used */}
            <div className="content-block">
              <p className="font-mono text-xs text-ember tracking-widest uppercase mb-4">Tools Used</p>
              <div className="space-y-2">
                {project.tools.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-3 font-mono text-sm text-slate-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="content-block border-t border-border-dim pt-8">
              <p className="font-mono text-xs text-ember tracking-widest uppercase mb-4">Details</p>
              <dl className="space-y-3">
                {[
                  ["Category", project.category],
                  ["Year", project.year],
                  ["Duration", "4–6 weeks"],
                  ["Client", "Confidential"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="font-mono text-xs text-slate">{label}</dt>
                    <dd className="font-mono text-xs text-slate-light">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* ── Gallery — horizontal filmstrip + lightbox ── */}
        {project.gallery?.length > 0 && (
          <div className="mt-16" ref={galleryRef}>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-xs text-ember tracking-widest uppercase">
                Gallery
              </p>
              <span className="font-mono text-xs text-slate">
                {project.gallery.length} images — scroll →
              </span>
            </div>

            {/* Horizontal scrollable strip */}
            <div
              className="flex gap-3 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {project.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  className="gallery-img shrink-0 overflow-hidden bg-card-bg border border-border-dim cursor-pointer relative group"
                  style={{
                    width: i === 0 ? "70vw" : "45vw",
                    maxWidth: i === 0 ? "600px" : "380px",
                    height: "260px",
                    scrollSnapAlign: "start",
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  onClick={() => {
                    const el = document.getElementById("lightbox");
                    const img = document.getElementById("lightbox-img");
                    if (el && img) {
                      img.src = src;
                      el.style.display = "flex";
                    }
                  }}
                >
                  <img
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* View icon on hover */}
                  <div className="absolute inset-0 bg-void bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-platinum border border-platinum px-3 py-1.5">
                      view
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            <div
              id="lightbox"
              className="fixed inset-0 z-50 bg-void bg-opacity-95 items-center justify-center"
              style={{ display: "none" }}
              onClick={() => {
                document.getElementById("lightbox").style.display = "none";
              }}
            >
              <button
                className="absolute top-6 right-6 font-mono text-sm text-slate hover:text-ember"
                onClick={() => {
                  document.getElementById("lightbox").style.display = "none";
                }}
              >
                ✕ close
              </button>
              <img
                id="lightbox-img"
                src=""
                alt="Full size"
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Prev / Next Navigation ── */}
      <div className="border-t border-border-dim">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 gap-6">
          {prevProject ? (
            <Link to={`/project/${prevProject.id}`} className="group">
              <p className="font-mono text-xs text-slate mb-2">← Previous</p>
              <p className="font-heading font-bold text-platinum group-hover:text-ember transition-colors">
                {prevProject.title}
              </p>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link to={`/project/${nextProject.id}`} className="group text-right">
              <p className="font-mono text-xs text-slate mb-2">Next →</p>
              <p className="font-heading font-bold text-platinum group-hover:text-ember transition-colors">
                {nextProject.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default ProjectDetail;
