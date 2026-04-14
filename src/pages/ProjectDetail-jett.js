import React, { useEffect, useRef, Suspense, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import { getById, projects } from "../data/projects";

const ModelViewer = React.lazy(() => import("../components/ModelViewer"));

gsap.registerPlugin(ScrollTrigger);

// ── Default theme fallback ────────────────────────────────────────────────────
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

// ── Wind slashes — thick, very visible ───────────────────────────────────────
// ── Wind slashes — sit behind content (zIndex 1) ─────────────────────────────
const WindStreaks = ({ color }) => {
  const streaks = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      top: `${3 + (i / 22) * 94}%`,
      width: `${120 + Math.random() * 340}px`,
      height: i % 5 === 0 ? "3px" : i % 3 === 0 ? "2px" : "1px",
      opacity: i % 5 === 0 ? 0.55 : i % 3 === 0 ? 0.32 : 0.18,
      duration: 1.6 + Math.random() * 2.8,
      delay: Math.random() * 6,
      skew: -4 + Math.random() * -10,
      blur: i % 5 === 0 ? "1px" : "0px",
    })), []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {streaks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: "-340px",
            width: s.width,
            height: s.height,
            background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
            opacity: s.opacity,
            transform: `skewY(${s.skew}deg)`,
            filter: `blur(${s.blur}) drop-shadow(0 0 4px ${color})`,
          }}
          animate={{ x: ["0vw", "140vw"] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// ── Jett kunai knives — behind content (zIndex 1) ────────────────────────────
const KnifeSVG = ({ color, size = 36 }) => (
  <svg width={size} height={size * 3.2} viewBox="0 0 24 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L16 28 L12 32 L8 28 Z" fill={color} opacity="0.9"/>
    <path d="M12 2 L16 28 L12 20 Z" fill="white" opacity="0.35"/>
    <rect x="7" y="31" width="10" height="3" rx="1" fill={color} opacity="0.7"/>
    <rect x="9.5" y="34" width="5" height="18" rx="2" fill={color} opacity="0.5"/>
    <line x1="9.5" y1="39" x2="14.5" y2="39" stroke={color} strokeWidth="1" opacity="0.8"/>
    <line x1="9.5" y1="44" x2="14.5" y2="44" stroke={color} strokeWidth="1" opacity="0.8"/>
    <line x1="9.5" y1="49" x2="14.5" y2="49" stroke={color} strokeWidth="1" opacity="0.8"/>
    <ellipse cx="12" cy="54" rx="3.5" ry="2.5" fill={color} opacity="0.6"/>
    <path d="M12 54 L11 70 L12 78 L13 70 Z" fill={color} opacity="0.2"/>
  </svg>
);

const JettKnives = ({ color }) => {
  const knives = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${20 + i * 28}%`,
      size: 20 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.18,
      duration: 3.5 + Math.random() * 3.5,
      delay: i * 2.8 + Math.random() * 2,
      tilt: -20 + Math.random() * 40,
      spinAmount: 180 + Math.random() * 270,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {knives.map((k) => (
        <motion.div
          key={k.id}
          style={{
            position: "absolute",
            top: k.top,
            left: "-80px",
            opacity: k.opacity,
            filter: `drop-shadow(0 0 4px ${color}88)`,
          }}
          animate={{ x: ["0vw", "115vw"], rotate: [k.tilt, k.tilt + k.spinAmount] }}
          transition={{ duration: k.duration, delay: k.delay, repeat: Infinity, ease: "linear" }}
        >
          <KnifeSVG color={color} size={k.size} />
        </motion.div>
      ))}
    </div>
  );
};

// ── Float particles (default motionStyle: "float") ────────────────────────────
const FloatParticles = ({ color }) => {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2.5,
      opacity: 0.07 + Math.random() * 0.12,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 7,
    })), []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -1200] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const AtmosphereLayer = ({ theme }) => {
  if (theme.motionStyle === "wind") return (
    <>
      <WindStreaks color={theme.particle} />
      <JettKnives color={theme.particle} />
    </>
  );
  if (theme.motionStyle === "float") return <FloatParticles color={theme.particle} />;
  return null;
};

// ── Main ──────────────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getById(id);
  const theme = project?.theme || DEFAULT_THEME;

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Inject theme fonts dynamically
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

  useEffect(() => {
    document.body.setAttribute("data-no-three", "true");
    return () => document.body.removeAttribute("data-no-three");
  }, []);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const { ref: modelRef, inView: modelInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  useEffect(() => {
    if (!project) return;
    const sections = contentRef.current?.querySelectorAll(".content-block");
    sections?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }, delay: i * 0.08,
      });
    });
    const imgs = galleryRef.current?.querySelectorAll(".gallery-img");
    imgs?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, scale: 0.96, y: 24 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }, delay: i * 0.1,
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-sm" style={{ color: theme.accent }}>Project not found.</p>
        <Link to="/" className="font-mono text-xs hover:underline" style={{ color: theme.accent }}>← Back Home</Link>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Themed background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: theme.bg, zIndex: -1 }} />

      {/* Atmosphere */}
      <AtmosphereLayer theme={theme} />

      {/* Edge vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)", zIndex: 1 }}
      />

      {/* Back button */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 pt-24 pb-4 pointer-events-none">
        <motion.div className="pointer-events-auto inline-block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-100 group"
            style={{ color: theme.accentSoft, opacity: 0.7, fontFamily: theme.fontBody }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:-translate-x-1 transition-transform">
              <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </motion.div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative h-[75vh] overflow-hidden" style={{ zIndex: 2 }}>
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
        </motion.div>
        {/* Dark overlay — crush the bright sky */}
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        {/* Extra top darkener so sky doesn't dominate */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)" }} />
        {/* Bottom glow — wide cyan energy bleed */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${theme.accent}55 0%, ${theme.accent}22 40%, transparent 100%)` }} />
        {/* Side vignettes for cinematic crop */}
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.7), transparent)" }} />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-xs px-3 py-1 tracking-widest uppercase"
                style={{ background: `${theme.accent}18`, color: theme.accent, border: `1px solid ${theme.accent}40`, fontFamily: theme.fontBody }}>
                {project.category}
              </span>
              <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.6 }}>{project.year}</span>
            </div>
            <h1 className="leading-none tracking-tight"
              style={{ fontFamily: theme.fontDisplay, color: theme.highlight, fontSize: "clamp(4rem,11vw,9rem)", textShadow: `0 0 40px ${theme.accent}, 0 0 80px ${theme.accent}99, 0 0 160px ${theme.accent}44` }}>
              {project.title}
            </h1>
            <motion.div className="mt-4 h-px"
              style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)`, width: 0 }}
              animate={{ width: "300px" }}
              transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef} style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main col */}
          <div className="lg:col-span-2">
            <div className="content-block">
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accent, fontFamily: theme.fontBody }}>Overview</p>
              <p className="text-lg leading-relaxed mb-5" style={{ color: theme.highlight, fontFamily: theme.fontBody, fontWeight: 300 }}>
                {project.description}
              </p>
              <p className="leading-relaxed" style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody, fontWeight: 300 }}>
                This project required deep collaboration between creative direction, technical implementation, and post-production — synthesizing everything from concept sketches through final delivery.
              </p>
            </div>

            {/* 3D Model */}
            {project.model && (
              <motion.div className="mt-14 content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}>
                  3D Model — Interactive
                </p>
                <div ref={modelRef} className="relative overflow-hidden"
                  style={{ height: "500px", background: theme.cardBg, border: `1px solid ${theme.border}`, boxShadow: `0 0 60px ${theme.accent}0d` }}>
                  {modelInView ? (
                    <Suspense fallback={
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <motion.div className="w-8 h-8" style={{ border: `1px solid ${theme.accent}` }}
                          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        <span className="font-mono text-xs animate-pulse" style={{ color: theme.accentSoft, opacity: 0.5 }}>Loading model...</span>
                      </div>
                    }>
                      <ModelViewer modelPath={project.model} />
                    </Suspense>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <motion.div className="w-6 h-6" style={{ border: `1px solid ${theme.border}` }}
                        animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                      <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.35 }}>Scroll to load model</span>
                    </div>
                  )}
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none" style={{ borderTop: `1px solid ${theme.accent}`, borderLeft: `1px solid ${theme.accent}` }} />
                  <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none" style={{ borderBottom: `1px solid ${theme.accent}`, borderRight: `1px solid ${theme.accent}` }} />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="font-mono text-xs px-3 py-1.5" style={{ color: theme.accentSoft, opacity: 0.45, background: theme.cardBg, border: `1px solid ${theme.border}` }}>
                      drag to rotate · scroll to zoom
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Coming soon */}
            {!project.model && project.id === "jett-valorant" && (
              <motion.div className="mt-14 content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accentSoft, opacity: 0.5 }}>3D Model — Coming Soon</p>
                <div className="flex flex-col items-center justify-center gap-4"
                  style={{ height: "300px", border: `1px dashed ${theme.accent}28`, background: theme.cardBg }}>
                  <motion.div className="w-16 h-16" style={{ border: `2px solid ${theme.accent}` }}
                    animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                  <p className="font-mono text-xs tracking-widest" style={{ color: theme.accentSoft, opacity: 0.45 }}>Interactive 3D viewer coming soon</p>
                </div>
              </motion.div>
            )}

            {/* Video */}
            {project.video && (
              <motion.div className="mt-14 content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}>Project Video</p>
                <div className="relative aspect-video overflow-hidden" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
                  <video src={project.video} controls className="w-full h-full object-cover" poster={project.thumbnail} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="content-block p-6" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: theme.accent, fontFamily: theme.fontBody }}>Tools Used</p>
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
              <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: theme.accent, fontFamily: theme.fontBody }}>Details</p>
              <dl className="space-y-3">
                {[["Category", project.category], ["Year", project.year], ["Duration", "4–6 weeks"], ["Client", "Confidential"]].map(([label, value]) => (
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
          <div className="mt-20" ref={galleryRef}>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent, fontFamily: theme.fontBody }}>Gallery</p>
              <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.45 }}>{project.gallery.length} images — scroll →</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              {project.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  className="gallery-img shrink-0 overflow-hidden cursor-pointer relative group"
                  style={{ width: i === 0 ? "70vw" : "45vw", maxWidth: i === 0 ? "600px" : "380px", height: "260px", scrollSnapAlign: "start", background: theme.cardBg, border: `1px solid ${theme.border}` }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  onClick={() => {
                    const el = document.getElementById("lightbox");
                    const img = document.getElementById("lightbox-img");
                    if (el && img) { img.src = src; el.style.display = "flex"; }
                  }}
                >
                  <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)" }}>
                    <span className="font-mono text-xs px-3 py-1.5" style={{ color: theme.accent, border: `1px solid ${theme.accent}` }}>view</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            <div id="lightbox" className="fixed inset-0 z-50 items-center justify-center" style={{ display: "none", background: "rgba(0,0,0,0.96)" }}
              onClick={() => { document.getElementById("lightbox").style.display = "none"; }}>
              <button className="absolute top-6 right-6 font-mono text-sm" style={{ color: theme.accentSoft }}
                onClick={() => { document.getElementById("lightbox").style.display = "none"; }}>
                ✕ close
              </button>
              <img id="lightbox-img" src="" alt="Full size" className="max-w-full max-h-full object-contain"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div style={{ borderTop: `1px solid ${theme.border}`, position: "relative", zIndex: 2 }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 gap-6">
          {prevProject ? (
            <Link to={`/project/${prevProject.id}`} className="group">
              <p className="font-mono text-xs mb-2" style={{ color: theme.accentSoft, opacity: 0.45 }}>← Previous</p>
              <p className="font-bold" style={{ fontFamily: theme.fontDisplay, color: theme.highlight }}>{prevProject.title}</p>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link to={`/project/${nextProject.id}`} className="group text-right">
              <p className="font-mono text-xs mb-2" style={{ color: theme.accentSoft, opacity: 0.45 }}>Next →</p>
              <p className="font-bold" style={{ fontFamily: theme.fontDisplay, color: theme.highlight }}>{nextProject.title}</p>
            </Link>
          ) : <div />}
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default ProjectDetail;