import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsCarousel from "../components/SkillsCarousel";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated text that reveals word-by-word ─── */
const RevealText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Home = () => {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger: fade-in about section paragraphs
    const paras = aboutRef.current?.querySelectorAll(".reveal-para");
    paras?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.12,
        }
      );
    });

    // Stats count-up animation
    const statEls = statsRef.current?.querySelectorAll(".stat-number");
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        onUpdate: () => {
          el.textContent = Math.round(proxy.val) + suffix;
        },
      });
    });

    // Contact section reveal
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: contactRef.current, start: "top 80%" },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <PageTransition>
      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
        {/* Ambient gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,77,28,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(77,159,255,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-24 pb-16 lg:py-0 min-h-screen">
          {/* ── Left: Copy ── */}
          <div className="relative z-10">
            {/* Label */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
            >
              <span className="w-8 h-px bg-ember" />
              <span className="font-mono text-xs text-ember tracking-widest uppercase">
                Motion Designer & Animator
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="font-display leading-none mb-6">
              <div className="overflow-hidden">
                <RevealText
                  text="OMKAR"
                  className="text-[clamp(5rem,12vw,9rem)] text-platinum block"
                  delay={3.0}
                />
              </div>
              <div className="overflow-hidden -mt-3">
                <RevealText
                  text="BANE"
                  className="text-[clamp(5rem,12vw,9rem)] text-gradient block"
                  delay={3.1}
                />
              </div>
            </h1>

            {/* Tagline */}
            <motion.p
              className="font-body text-slate text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.7 }}
            >
             I build 3D worlds and bring them to life — from sculpting characters to animating and finishing them for the screen.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-5 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.6 }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden px-8 py-4 bg-ember text-void font-heading font-bold text-sm tracking-widest uppercase inline-flex items-center gap-3 hover:bg-ember-glow transition-colors duration-300"
              >
                View Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-heading font-semibold text-sm text-slate hover:text-platinum transition-colors duration-200 border-b border-transparent hover:border-platinum pb-0.5"
              >
                Get in touch
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute -bottom-20 left-0 flex flex-col items-center gap-2 hidden lg:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2 }}
            >
              <span className="font-mono text-xs text-slate tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-ember to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* ── Right: Skills Carousel ── */}
          <motion.div
            className="relative h-[280px] sm:h-[360px] lg:h-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1.2 }}
          >
            {/* Glow halo behind carousel */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,77,28,0.12) 0%, transparent 70%)",
              }}
            />
            <SkillsCarousel />
          </motion.div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="border-y border-border-dim py-4 overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-display text-4xl text-border-dim tracking-widest">
              MOTION DESIGN &nbsp;•&nbsp; 3D ANIMATION &nbsp;•&nbsp; VISUAL FX &nbsp;•&nbsp; GENERATIVE ART &nbsp;•&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p
                className="font-mono text-xs text-ember tracking-widest uppercase mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Selected Work
              </motion.p>
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,6rem)] text-platinum leading-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                PROJECTS
              </motion.h2>
            </div>
            <motion.span
              className="font-mono text-sm text-slate hidden md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {projects.length} projects
            </motion.span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-28 px-6 md:px-12 border-t border-border-dim" ref={aboutRef}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div>
            {/* Profile photo */}
            <div className="mb-8 reveal-para">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <img
                  src="/ob.png"
                  alt="Omkar Bane"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ border: "1px solid #1A1A2E" }}
                />
                {/* Ember corner accent */}
                <div className="absolute -bottom-2 -right-2 w-full h-full border border-ember pointer-events-none" />
              </div>
            </div>

            <p className="font-mono text-xs text-ember tracking-widest uppercase mb-4 reveal-para">
              About
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-platinum leading-none mb-8 reveal-para">
              MAKING THE<br />INVISIBLE<br />
              <span className="text-gradient">VISIBLE</span>
            </h2>
            <p className="font-body text-slate leading-relaxed mb-5 reveal-para">
              I'm Omkar Bane — a 3D model designer and animator with 1+ years of experience
              crafting visual stories for brands, studios, and galleries worldwide. My work
              lives at the intersection of technology and emotion.
            </p>
            <p className="font-body text-slate leading-relaxed reveal-para">
              From photorealistic 3D simulations to hand-crafted frame-by-frame sequences,
              I bring a versatile toolkit and an obsessive eye for detail to every project.
            </p>

            {/* Timeline */}
           <div className="mt-10 space-y-5">
              {[
                { year: "2025", event: "Current ,  — Chembur Naka" },
                { year: "2025", event: "Chembur Animator, Completion — Chembur" },
                { year: "2020", event: "Chembur Animations, Study — Chembur" },
              ].map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  {/* Year badge */}
                  <span className="font-mono text-xs text-ember bg-void border border-border-dim px-2 py-1 shrink-0 mt-0.5">
                    {year}
                  </span>
                  {/* Divider + text */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-px self-stretch bg-border-dim shrink-0 mt-1" />
                    <span className="font-body text-sm text-slate-light leading-relaxed break-words">
                      {event}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stats + Tools */}
          <div>
            {/* Stats */}
            <div
              ref={statsRef}
               className="grid grid-cols-2 gap-6 mb-10 p-6 md:p-8 border border-border-dim bg-card-bg"
            >
              {[
                { target: 1, suffix: "+", label: "Years experience" },
                { target: 30, suffix: "+", label: "Projects delivered" },
                { target: 1, suffix: "", label: "Awards won" },
                { target: 30, suffix: "K+", label: "Views generated" },
              ].map(({ target, suffix, label }) => (
                <div key={label}>
                  <span
                    className="font-display text-5xl text-ember stat-number"
                    data-target={target}
                    data-suffix={suffix}
                  >
                    0{suffix}
                  </span>
                  <p className="font-mono text-xs text-slate mt-1 tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div>
              <p className="font-mono text-xs text-slate tracking-widest uppercase mb-5">
                Tools & Software
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Maya","ZBrush",
                  "Blender","Adobe After Effects","Adobe Premiere Pro"
                  ,"Adobe Substance Painter","Adobe Illustrator","Adobe Photoshop"
                ].map((tool) => (
                  <motion.span
                    key={tool}
                    className="font-mono text-xs px-3 py-2 border border-border-dim text-slate hover:border-ember hover:text-ember transition-colors duration-200"
                    whileHover={{ scale: 1.03 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        className="py-28 px-6 md:px-12 border-t border-border-dim"
        ref={contactRef}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs text-ember tracking-widest uppercase mb-4">
            Let's Collaborate
          </p>
          <h2 className="font-display text-[clamp(3rem,9vw,8rem)] text-platinum leading-none mb-6">
            SAY HELLO
          </h2>
          <p className="font-body text-slate text-lg max-w-xl mx-auto mb-12">
            Have a project in mind? Whether it's a brand film, music video, or interactive
            custom 3D models — let's create something remarkable together.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 w-full px-4">
            <a
              href="mailto:omkarbane378@gmail.com"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ember text-void font-heading font-bold text-sm tracking-widest uppercase hover:bg-ember-glow transition-colors duration-300"
            >
              omkarbane378@gmail.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="tel:+91 8369743080"
              className="font-mono text-sm text-slate hover:text-platinum transition-colors duration-200"
            >
              +91 8369743080
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {["Instagram", "LinkedIn", "Twitter"].map((s) => (
              <motion.a
                key={s}
                href="#"
                className="font-mono text-xs text-slate hover:text-ember transition-colors duration-200"
                whileHover={{ y: -3 }}
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Home;
