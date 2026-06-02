import React, { useEffect, useRef, Suspense } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import { getById, projects } from "../data/projects";

// ── AtmosphereLayer is now its own file (STEP 8) ─────────────────────────────
// All the inline WindStreaks / JettKnives / FloatParticles definitions are
// removed from here. Import from the new component instead.
import AtmosphereLayer from "../components/AtmosphereLayer";

// ── ModelViewer lazy-loaded — only parsed when actually needed ────────────────
const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

gsap.registerPlugin(ScrollTrigger);

// ── Default theme (used when project has no custom theme) ────────────────────
const DEFAULT_THEME = {
  bg: "linear-gradient(160deg, #050508 0%, #0a0a12 100%)",
  atmosphere: "rgba(255,75,28,0.05)",
  accent: "#FF4D1C",
  accentSoft: "#ff9a7a",
  highlight: "#fff0eb",
  heroOverlay: "linear-gradient(to bottom, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.92) 100%)",
  particle: "#FF4D1C",
  fontDisplay: "'Rajdhani', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  fonts: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400&display=swap",
  motionStyle: "float",
  cardBg: "rgba(10,10,18,0.85)",
  border: "rgba(255,75,28,0.18)",
};

// ── Gallery ───────────────────────────────────────────────────────────────────
const Gallery = ({ project, theme, galleryRef }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <div className="mt-20" ref={galleryRef}>
      <div className="flex items-center justify-between mb-6">
        <p
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: theme.accent, fontFamily: theme.fontBody }}
        >
          Gallery
        </p>
        <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.45 }}>
          {project.gallery.length} images
        </span>
      </div>

      <div className="relative">
        {/* Scroll left */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.accentSoft }}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Scroll right */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.accentSoft }}
          aria-label="Scroll right"
        >
          ›
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {project.gallery.map((src, i) => (
            <div
              key={i}
              className="gallery-img shrink-0 overflow-hidden cursor-pointer relative group"
              style={{
                width: i === 0 ? "70vw" : "45vw",
                maxWidth: i === 0 ? "600px" : "380px",
                height: "260px",
                scrollSnapAlign: "start",
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
              }}
              onClick={() => {
                const el = document.getElementById("lightbox");
                const img = document.getElementById("lightbox-img");
                if (el && img) { img.src = src; el.style.display = "flex"; }
              }}
            >
              <img
                src={src}
                alt={`${project.title} ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <span
                  className="font-mono text-xs px-3 py-1.5"
                  style={{ color: theme.accent, border: `1px solid ${theme.accent}` }}
                >
                  view
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        id="lightbox"
        className="fixed inset-0 z-50 items-center justify-center"
        style={{ display: "none", background: "rgba(0,0,0,0.96)" }}
        onClick={() => { document.getElementById("lightbox").style.display = "none"; }}
      >
        <button
          className="absolute top-6 right-6 font-mono text-sm"
          style={{ color: theme.accentSoft }}
          onClick={() => { document.getElementById("lightbox").style.display = "none"; }}
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
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getById(id);
  const theme = project?.theme || DEFAULT_THEME;

  // Scroll to top on project change
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Inject per-project Google Fonts
  useEffect(() => {
    if (!theme.fonts) return;
    const existing = document.getElementById("project-theme-fonts");
    if (existing) existing.remove();
    const link = document.createElement("link");
    link.id = "project-theme-fonts";
    link.rel = "stylesheet";
    link.href = theme.fonts;
    document.head.appendChild(link);
    return () => link.remove();
  }, [theme.fonts]);

  // Tell ThreeHero to stand down on project pages
  useEffect(() => {
    document.body.setAttribute("data-no-three", "true");
    return () => document.body.removeAttribute("data-no-three");
  }, []);

  const heroRef     = useRef(null);
  const contentRef  = useRef(null);
  const galleryRef  = useRef(null);

  // Model loads only when scrolled into view (triggerOnce = no re-load on scroll back)
  const { ref: modelRef, inView: modelInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject  = projects[currentIndex - 1] || null;
  const nextProject  = projects[currentIndex + 1] || null;

  // GSAP scroll animations
  useEffect(() => {
    if (!project) return;

    const sections = contentRef.current?.querySelectorAll(".content-block");
    sections?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        delay: i * 0.08,
      });
    });

    // Gallery entrance via IntersectionObserver (lighter than GSAP ScrollTrigger for images)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gallery-card-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const imgs = galleryRef.current?.querySelectorAll(".gallery-img");
    imgs?.forEach((el) => { el.style.opacity = "0"; observer.observe(el); });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      observer.disconnect();
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-sm" style={{ color: theme.accent }}>Project not found.</p>
        <Link to="/" className="font-mono text-xs hover:underline" style={{ color: theme.accent }}>
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Fixed background — own layer, no repaints */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: theme.bg, zIndex: -1 }} />

      {/* Atmosphere (wind streaks / float particles) — from new component file */}
      <AtmosphereLayer theme={theme} />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          zIndex: 1,
        }}
      />

      {/* Back button */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 pt-24 pb-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-100 group"
            style={{ color: theme.accentSoft, opacity: 0.7, fontFamily: theme.fontBody }}
          >
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </motion.div>
      </div>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-[75vh] overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 scale-110">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)" }} />
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${theme.accent}55 0%, ${theme.accent}22 40%, transparent 100%)` }}
        />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.7), transparent)" }} />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span
                className="font-mono text-xs px-3 py-1 tracking-widest uppercase"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontFamily: theme.fontBody,
                }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs" style={{ color: "#ffffff", opacity: 0.7 }}>
                {project.year}
              </span>
            </div>
            <h1
              className="leading-none tracking-tight"
              style={{
                fontFamily: theme.fontDisplay,
                color: theme.highlight,
                fontSize: "clamp(4rem,11vw,9rem)",
                textShadow: `0 0 40px ${theme.accent}88`,
              }}
            >
              {project.title}
            </h1>
            <motion.div
              className="mt-4 h-px"
              style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)`, width: 0 }}
              animate={{ width: "300px" }}
              transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef} style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left col */}
          <div className="lg:col-span-2">
            <div className="content-block">
              <p
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: theme.accent, fontFamily: theme.fontBody }}
              >
                Overview
              </p>
              <p
                className="text-lg leading-relaxed mb-5"
                style={{ color: theme.highlight, fontFamily: theme.fontBody, fontWeight: 300 }}
              >
                {project.description}
              </p>
              <p
                className="leading-relaxed"
                style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody, fontWeight: 300 }}
              >
                This project required deep collaboration between creative direction, technical
                implementation, and post-production — synthesizing everything from concept
                sketches through final delivery.
              </p>
            </div>

            {/* 3D Model — only mounts when scrolled into view */}
            {project.model && (
              <motion.div
                className="mt-14 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-4"
                  style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}
                >
                  3D Model — Interactive
                </p>
                <div
                  ref={modelRef}
                  className="relative overflow-hidden"
                  style={{
                    height: "500px",
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                    boxShadow: `0 0 60px ${theme.accent}0d`,
                  }}
                >
                  {modelInView ? (
                    <Suspense
                      fallback={
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                          <motion.div
                            className="w-8 h-8"
                            style={{ border: `1px solid ${theme.accent}` }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <span
                            className="font-mono text-xs animate-pulse"
                            style={{ color: theme.accentSoft, opacity: 0.5 }}
                          >
                            Loading model...
                          </span>
                        </div>
                      }
                    >
                      <ModelViewer modelPath={project.model} />
                    </Suspense>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <motion.div
                        className="w-6 h-6"
                        style={{ border: `1px solid ${theme.border}` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.35 }}>
                        Scroll to load model
                      </span>
                    </div>
                  )}

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
                    style={{ borderTop: `1px solid ${theme.accent}`, borderLeft: `1px solid ${theme.accent}` }} />
                  <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
                    style={{ borderBottom: `1px solid ${theme.accent}`, borderRight: `1px solid ${theme.accent}` }} />

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span
                      className="font-mono text-xs px-3 py-1.5"
                      style={{
                        color: theme.accentSoft,
                        opacity: 0.45,
                        background: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      drag to rotate · scroll to zoom
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3D coming soon placeholder */}
            {!project.model && project.id === "jett-valorant" && (
              <motion.div
                className="mt-14 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="font-mono text-xs tracking-widest uppercase mb-4"
                  style={{ color: theme.accentSoft, opacity: 0.5 }}>
                  3D Model — Coming Soon
                </p>
                <div
                  className="flex flex-col items-center justify-center gap-4"
                  style={{ height: "300px", border: `1px dashed ${theme.accent}28`, background: theme.cardBg }}
                >
                  <motion.div
                    className="w-16 h-16"
                    style={{ border: `2px solid ${theme.accent}` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="font-mono text-xs tracking-widest" style={{ color: theme.accentSoft, opacity: 0.45 }}>
                    Interactive 3D viewer coming soon
                  </p>
                </div>
              </motion.div>
            )}

            {/* Video */}
            {project.video && (
              <motion.div
                className="mt-14 content-block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-4"
                  style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}
                >
                  Project Video
                </p>
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}
                >
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

          {/* Right col — sidebar */}
          <div className="space-y-6">
            <div className="content-block p-6" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-5"
                style={{ color: theme.accent, fontFamily: theme.fontBody }}
              >
                Tools Used
              </p>
              <div className="space-y-3">
                {project.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-3 text-sm" style={{ fontFamily: theme.fontBody }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: theme.accent }} />
                    <span style={{ color: theme.highlight, opacity: 0.8 }}>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-block p-6" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-5"
                style={{ color: theme.accent, fontFamily: theme.fontBody }}
              >
                Details
              </p>
              <dl className="space-y-3">
                {[
                  ["Category", project.category],
                  ["Year", project.year],
                  ["Duration", "4–6 weeks"],
                  ["Client", "Confidential"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.5 }}>{label}</dt>
                    <dd className="font-mono text-xs" style={{ color: theme.highlight, opacity: 0.8 }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <Gallery project={project} theme={theme} galleryRef={galleryRef} />
        )}
      </div>

      {/* Prev / Next navigation */}
      <div style={{ borderTop: `1px solid ${theme.border}`, position: "relative", zIndex: 2 }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 gap-6">
          {prevProject ? (
            <Link to={`/project/${prevProject.id}`} className="group">
              <p className="font-mono text-xs mb-2" style={{ color: theme.accentSoft, opacity: 0.45 }}>← Previous</p>
              <p className="font-bold" style={{ fontFamily: theme.fontDisplay, color: theme.highlight }}>
                {prevProject.title}
              </p>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link to={`/project/${nextProject.id}`} className="group text-right">
              <p className="font-mono text-xs mb-2" style={{ color: theme.accentSoft, opacity: 0.45 }}>Next →</p>
              <p className="font-bold" style={{ fontFamily: theme.fontDisplay, color: theme.highlight }}>
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