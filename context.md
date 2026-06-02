# Project context: omkar-portfolio
Generated: 2026-06-02 · 31 files · stripped: comments, blank_lines, console_logs

---

## Project structure

```
omkar-portfolio/
├── README.md
├── models/
│   └── files/
│       ├── ProjectDetail-fine.js
│       └── ProjectDetail-jett.js
├── package.json
├── postcss.config.js
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── models/
│       └── compressor.md
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components/
│   │   ├── CustomCursor.js
│   │   ├── Footer.js
│   │   ├── ModelViewer-fine.js
│   │   ├── ModelViewer.js
│   │   ├── Navbar.js
│   │   ├── PageTransition.js
│   │   ├── Preloader.js
│   │   ├── ProjectCard.js
│   │   └── ThreeHero.js
│   ├── data/
│   │   └── projects.js
│   ├── hooks/
│   │   ├── useCursor.js
│   │   └── useScrollProgress.js
│   ├── index.css
│   ├── index.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── ProjectDetail.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── tailwind.config.js
└── vercel.json
```

---

## Files

### `README.md`

```md
# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
### Code Splitting
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
### Analyzing the Bundle Size
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
### Making a Progressive Web App
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
### Advanced Configuration
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
### Deployment
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
### `npm run build` fails to minify
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
```

### `models/files/ProjectDetail-fine.js`

```js
import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../../src/components/PageTransition";
import Footer from "../../src/components/Footer";
import ModelViewer from "../../src/components/ModelViewer";
import { getById, projects } from "../../src/data/projects";
gsap.registerPlugin(ScrollTrigger);
const ProjectDetail = () => {
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
  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;
  useEffect(() => {
    if (!project) return;
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
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      }
    );
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
      {}
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
      {}
      <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
        {}
        <div className="hero-img absolute inset-0 scale-110">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        {}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.85) 100%)",
          }}
        />
        {}
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
      {}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {}
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
            {}
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
                  <ModelViewer modelPath={project.model} />
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
            {}
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
          {}
          <div className="space-y-8">
            {}
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
            {}
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
        {}
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
            {}
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
                  {}
                  <div className="absolute inset-0 bg-void bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-platinum border border-platinum px-3 py-1.5">
                      view
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            {}
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
      {}
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
```

### `models/files/ProjectDetail-jett.js`

```js
import React, { useEffect, useRef, Suspense, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import PageTransition from "../../src/components/PageTransition";
import Footer from "../../src/components/Footer";
import { getById, projects } from "../../src/data/projects";
const ModelViewer = React.lazy(() => import("../../src/components/ModelViewer"));
gsap.registerPlugin(ScrollTrigger);
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
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getById(id);
  const theme = project?.theme || DEFAULT_THEME;
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
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
      {}
      <div className="fixed inset-0 pointer-events-none" style={{ background: theme.bg, zIndex: -1 }} />
      {}
      <AtmosphereLayer theme={theme} />
      {}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)", zIndex: 1 }}
      />
      {}
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
      {}
      <section ref={heroRef} className="relative h-[75vh] overflow-hidden" style={{ zIndex: 2 }}>
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
        </motion.div>
        {}
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        {}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)" }} />
        {}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${theme.accent}55 0%, ${theme.accent}22 40%, transparent 100%)` }} />
        {}
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
      {}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef} style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {}
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
            {}
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
                  {}
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
            {}
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
            {}
            {project.video && (
              <motion.div className="mt-14 content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}>Project Video</p>
                <div className="relative aspect-video overflow-hidden" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
                  <video src={project.video} controls className="w-full h-full object-cover" poster={project.thumbnail} />
                </div>
              </motion.div>
            )}
          </div>
          {}
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
        {}
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
            {}
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
      {}
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
```

### `package.json`

```json
{
  "name": "animator-portfolio",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.0",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^13.5.0",
    "autoprefixer": "^10.4.27",
    "framer-motion": "^12.38.0",
    "gsap": "^3.14.2",
    "postcss": "^8.5.9",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-intersection-observer": "^10.0.3",
    "react-router-dom": "^7.14.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.4.19",
    "three": "^0.183.2",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#050508" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>Omkar Bane — Motion Designer & Animator</title>
<meta name="description" content="Omkar Bane — Motion Designer and Animator crafting cinematic experiences, 3D animation, and visual effects." />
<meta property="og:title" content="Omkar Bane — Motion Designer" />
<meta property="og:description" content="Portfolio of Omkar Bane, motion designer and animator." />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### `public/manifest.json`

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### `public/models/compressor.md`

```md
gltf-transform optimize jett.glb jett-optimized.glb --texture-compress webp
```

### `src/App.css`

```css
.App {
  text-align: center;
}
.App-logo {
  height: 40vmin;
  pointer-events: none;
}
@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}
.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.App-link {
  color: #61dafb;
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### `src/App.js`

```js
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import { projects } from "./data/projects";
const ModelPreloadMesh = ({ url }) => {
  useGLTF(url);
  return null;
};
const ModelPreloader = () => (
  <div
    style={{
      position: "fixed",
      width: 1,
      height: 1,
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    }}
  >
    <Canvas>
      <Suspense fallback={null}>
        {projects
          .filter((p) => p.model)
          .map((p) => (
            <ModelPreloadMesh key={p.id} url={p.model} />
          ))}
      </Suspense>
    </Canvas>
  </div>
);
const HomePromise = import("./pages/Home");
const DetailPromise = import("./pages/ProjectDetail");
const Home = lazy(() => HomePromise);
const ProjectDetail = lazy(() => DetailPromise);
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
};
function App() {
  const [chunksReady, setChunksReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showApp, setShowApp] = useState(false);
  useEffect(() => {
    Promise.all([HomePromise, DetailPromise]).then(() => {
      setChunksReady(true);
    });
  }, []);
  useEffect(() => {
    if (chunksReady && preloaderDone) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowApp(true);
        });
      });
    }
  }, [chunksReady, preloaderDone]);
  return (
    <>
      {}
      {!showApp && (
        <Preloader
          chunksReady={chunksReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}
      {}
      <div style={{ visibility: showApp ? "visible" : "hidden" }}>
        <Router>
          {}
          <ModelPreloader />
          <CustomCursor />
          <Navbar />
          <Suspense fallback={null}>
            <AnimatedRoutes />
          </Suspense>
        </Router>
      </div>
    </>
  );
}
export default App;
```

### `src/App.test.js`

```js
import { render, screen } from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### `src/components/CustomCursor.js`

```js
import React from "react";
import { useCursor } from "../hooks/useCursor";
const CustomCursor = () => {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};
export default CustomCursor;
```

### `src/components/Footer.js`

```js
import React from "react";
import { motion } from "framer-motion";
const SOCIALS = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-dim px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-platinum">
            O<span className="text-ember">B</span>
          </span>
          <span className="font-mono text-xs text-slate">
            © {year} Omkar Bane. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-8">
          {SOCIALS.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate hover:text-ember transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
```

### `src/components/ModelViewer-fine.js`

```js
import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
const Model = ({ url }) => {
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${window.location.origin}${url}`;
  const { scene } = useGLTF(absoluteUrl);
  const groupRef = useRef();
  const { mouse, camera } = useThree();
  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    groupRef.current.position.set(-center.x, -center.y, -center.z);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      groupRef.current.scale.setScalar(scale);
    }
    const fovRad = (45 * Math.PI) / 180;
    const fitDist = (2 / (2 * Math.tan(fovRad / 2))) * 3.0;
    camera.position.set(0, 0, fitDist);
    camera.near = 0.01;
    camera.far = fitDist * 200;
    camera.updateProjectionMatrix();
  }, [scene, camera]);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 1.0 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.4 - groupRef.current.rotation.x) * 0.05;
  });
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};
const ModelFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#FF4D1C" wireframe />
  </mesh>
);
class GLBErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <p className="font-mono text-xs text-ember">Failed to load model</p>
          <p className="font-mono text-xs text-slate">Check console for details</p>
        </div>
      );
    }
    return this.props.children;
  }
}
const ModelViewer = ({ modelPath }) => {
  const [isTouching, setIsTouching] = useState(false);
  return (
    <GLBErrorBoundary>
      {}
      <div className="absolute top-3 right-3 z-10 md:hidden">
        <span className="font-mono text-xs text-slate bg-void px-2 py-1 border border-border-dim">
          pinch · drag to rotate
        </span>
      </div>
      {}
      {!isTouching && (
        <div
          className="absolute inset-0 z-20 md:hidden"
          onTouchStart={() => setIsTouching(true)}
          style={{ background: "transparent" }}
        />
      )}
      {}
      {!isTouching && (
        <div
          className="absolute inset-0 z-30 md:hidden flex items-center justify-center pointer-events-none"
        >
          <span className="font-mono text-xs text-ember bg-void px-4 py-2 border border-ember border-opacity-50">
            tap to interact with model
          </span>
        </div>
      )}
      {}
      {isTouching && (
        <button
          className="absolute top-3 right-3 z-30 md:hidden font-mono text-xs text-slate bg-void px-3 py-1.5 border border-border-dim"
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsTouching(false);
          }}
        >
          ✕ done
        </button>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        style={{
          touchAction: isTouching ? "none" : "pan-y",
        }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 10, 7]} intensity={3} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
        <pointLight position={[-10, 5, 10]} intensity={2} color="#4DD8FF" />
        <pointLight position={[0, -10, 5]} intensity={1} color="#FF4D1C" />
        <hemisphereLight skyColor="#ffffff" groundColor="#222222" intensity={1.5} />
        <Environment preset="studio" />
        <Suspense fallback={<ModelFallback />}>
          <Model url={modelPath} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.0}
          minDistance={0.5}
          maxDistance={20}
          enabled={isTouching || window.matchMedia("(hover: hover)").matches}
        />
      </Canvas>
    </GLBErrorBoundary>
  );
};
export default ModelViewer;
```

### `src/components/ModelViewer.js`

```js
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
const preloadModel = (url) => {
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${window.location.origin}${url}`;
  useGLTF.preload(absoluteUrl);
};
const Model = ({ url }) => {
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${window.location.origin}${url}`;
  const { scene } = useGLTF(absoluteUrl);
  const groupRef = useRef();
  const { mouse, camera } = useThree();
  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    groupRef.current.position.set(-center.x, -center.y, -center.z);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      groupRef.current.scale.setScalar(scale);
    }
    const fovRad = (45 * Math.PI) / 180;
    const fitDist = (2 / (2 * Math.tan(fovRad / 2))) * 1.4;
    camera.position.set(0, 0, fitDist);
    camera.near = 0.01;
    camera.far = fitDist * 200;
    camera.updateProjectionMatrix();
  }, [scene, camera]);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02;
  });
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};
const ModelFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#FF4D1C" wireframe />
  </mesh>
);
class GLBErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <p className="font-mono text-xs text-ember">Failed to load model</p>
          <p className="font-mono text-xs text-slate">Check console for details</p>
        </div>
      );
    }
    return this.props.children;
  }
}
const ModelViewer = ({ modelPath }) => {
  useEffect(() => {
    preloadModel(modelPath);
  }, [modelPath]);
  return (
    <div className="relative w-full h-full">
      <GLBErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 1000 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 1.5]}
          style={{
            touchAction: "pan-y",
          }}
        >
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 10, 7]} intensity={3} />
          <directionalLight position={[-5, -5, -5]} intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
          <pointLight position={[-10, 5, 10]} intensity={2} color="#4DD8FF" />
          <pointLight position={[0, -10, 5]} intensity={1} color="#FF4D1C" />
          <hemisphereLight skyColor="#ffffff" groundColor="#222222" intensity={1.5} />
          <Environment preset="studio" />
          <Suspense fallback={<ModelFallback />}>
            <Model url={modelPath} />
          </Suspense>
          {}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.6}
            minDistance={0.5}
            maxDistance={20}
            enabled={true}
          />
        </Canvas>
        {}
        <div className="absolute bottom-4 left-0 right-0 hidden md:flex justify-center pointer-events-none">
          <span className="font-mono text-xs text-slate bg-void px-3 py-1.5 border border-border-dim">
            drag to rotate · scroll to zoom
          </span>
        </div>
      </GLBErrorBoundary>
    </div>
  );
};
export default ModelViewer;
```

### `src/components/Navbar.js`

```js
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useScrollProgress } from "../hooks/useScrollProgress";
const NAV_LINKS = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const navRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.8 }
    );
  }, []);
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        window.location.href = href;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };
  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass" : ""
        }`}
      >
        {}
        <Link to="/" className="font-display text-2xl text-platinum tracking-wider">
        O<span className="text-ember">B</span>
        </Link>
        {}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="font-heading text-sm font-semibold text-slate hover:text-platinum transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              onClick={(e) => handleSmoothScroll(e, "/#contact")}
              className="font-heading text-sm font-semibold px-5 py-2.5 border border-ember text-ember hover:bg-ember hover:text-void transition-all duration-300 rounded-sm"
            >
              Hire Me
            </a>
          </li>
        </ul>
        {}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px bg-platinum w-full origin-center"
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-px bg-platinum w-2/3"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px bg-platinum w-full origin-center"
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
        {}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-ember origin-left"
          style={{ scaleX: progress }}
          transition={{ ease: "linear" }}
        />
      </nav>
      {}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="font-display text-5xl text-platinum hover:text-ember transition-colors"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
```

### `src/components/PageTransition.js`

```js
import React from "react";
import { motion } from "framer-motion";
const variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};
const PageTransition = ({ children }) => (
  <motion.div
    className="page-wrapper"
    variants={variants}
    initial="initial"
    animate="enter"
    exit="exit"
  >
    {}
    <motion.div
      className="fixed inset-0 bg-ember z-[9000] origin-top pointer-events-none"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    />
    <motion.div
      className="fixed inset-0 bg-void z-[8999] origin-top pointer-events-none"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
    />
    {children}
  </motion.div>
);
export default PageTransition;
```

### `src/components/Preloader.js`

```js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Preloader = ({ onComplete, chunksReady }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let current = 0;
    let raf;
    const tick = () => {
      let speed;
      if (current < 70) {
        speed = 0.8;
      } else if (current < 99) {
        speed = chunksReady ? 1.5 : 0.05; 
      } else {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 700);
        }, 500);
        return;
      }
      current = Math.min(current + speed, 99);
      setProgress(Math.floor(current));
      raf = requestAnimationFrame(tick);
    };
    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 200);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [chunksReady, onComplete]);
  const letters = "OMKAR BANE".split("");
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {}
          <div className="flex gap-1 overflow-hidden flex-wrap justify-center px-4">
            {letters.map((char, i) =>
              char === " " ? (
                <span key={i} className="w-4 md:w-6" />
              ) : (
                <motion.span
                  key={i}
                  className="font-display text-5xl md:text-8xl text-platinum"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </div>
          <motion.p
            className="font-mono text-xs text-slate mt-3 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Motion Designer & Animator
          </motion.p>
          {}
          <div className="preloader-bar mt-6">
            <div
              className="preloader-progress"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
          <motion.span
            className="font-mono text-xs text-ember mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Preloader;
```

### `src/components/ProjectCard.js`

```js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
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
          {}
          <div className="relative aspect-video overflow-hidden bg-card-bg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {}
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
            {}
            <div ref={glareRef} className="absolute inset-0 pointer-events-none" />
            {}
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
          {}
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
            {}
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
```

### `src/components/ThreeHero.js`

```js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
const ThreeHero = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    if (document.body.getAttribute("data-no-three")) return;
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 2);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0xff4d1c, 8, 12);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x4d9fff, 5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f18,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xff4d1c,
      emissiveIntensity: 0.05,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icosahedron);
    const wireGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff4d1c,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireframe);
    const torusGeo1 = new THREE.TorusGeometry(1.8, 0.012, 8, 80);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xff4d1c,
      transparent: true,
      opacity: 0.7,
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.rotation.x = Math.PI / 3;
    scene.add(torus1);
    const torusGeo2 = new THREE.TorusGeometry(2.1, 0.008, 8, 80);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x4d9fff,
      transparent: true,
      opacity: 0.4,
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.z = Math.PI / 5;
    scene.add(torus2);
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xb8c4d4,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    const group = new THREE.Group();
    group.add(icosahedron, wireframe, torus1, torus2, particles);
    scene.add(group);
    gsap.to(group.position, {
      y: 0.3,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    let rafId;
    let elapsed  = 0;
    let lastTime = performance.now();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now = performance.now();
      elapsed += (now - lastTime) / 1000;
      lastTime = now;
      const t = elapsed;
      target.x += (mouse.x * 0.4 - target.x) * 0.05;
      target.y += (mouse.y * 0.3 - target.y) * 0.05;
      group.rotation.y = target.x;
      group.rotation.x = target.y;
      icosahedron.rotation.y = t * 0.15;
      wireframe.rotation.y   = t * 0.15;
      wireframe.rotation.x   = t * 0.08;
      torus1.rotation.z =  t * 0.3;
      torus2.rotation.z = -t * 0.2;
      particles.rotation.y = t * 0.05;
      pointLight1.intensity = 8 + Math.sin(t * 2) * 2;
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const onContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
    };
    const onContextRestored = () => {
      animate();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      [icoGeo, wireGeo, torusGeo1, torusGeo2, particleGeo].forEach((g) => g.dispose());
      [icoMat, wireMat, torusMat1, torusMat2, particleMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
};
export default ThreeHero;
```

### `src/data/projects.js`

```js
export const projects = [
  {
    id: "jett-valorant",
    title: "Jett",
    category: "3D Character Modeling",
    year: "2025",
    description: "A full character animation breakdown of Jett from Valorant — rigging, skinning, and motion capture cleanup combined with hand-keyed action sequences. Every ability animation was crafted to match the in-game feel while pushing the expressiveness further for a cinematic presentation.",
    shortDesc: "Valorant character rig & cinematic animation",
    tools: ["Maya", "Blender", "After Substance Painter", "Adobe After Effect"],
    color: "#4DD8FF",
    thumbnail: "/projects/jett/jett-4.jpeg",
    video: "/projects/jett/jett-video.mp4",
    model: "/models/jett-txt.glb",
    gallery: [
      "/projects/jett/jett-6.jpeg",
      "/projects/jett/jett-1.jpeg",
      "/projects/jett/jett-3.jpg",
      "/projects/jett/jett-5.jpg",
      "/projects/jett/jett-7.jpeg",
    ],
    featured: true,
    theme: {
      bg: "linear-gradient(160deg, #000608 0%, #010d14 35%, #000a10 70%, #000507 100%)",
      atmosphere: "rgba(77, 216, 255, 0.04)",
      accent: "#00D4FF",
      accentSoft: "#7ee8ff",
      highlight: "#c8f4ff",
      particle: "#00D4FF",
      fontDisplay: "'Rajdhani', sans-serif",
      fontBody: "'DM Sans', sans-serif",
      fonts: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap",
      motionStyle: "wind",
      cardBg: "rgba(0, 10, 16, 0.92)",
      border: "rgba(0, 212, 255, 0.22)",
      glowStrong: "rgba(0, 212, 255, 0.55)",
      glowSoft: "rgba(0, 212, 255, 0.12)",
    },
  },
 {
    id: "Male",
    title: "Male",
    category: "3D Character Modeling",
    year: "2025",
    description: "A male character animation.",
    shortDesc: "A 3D Male Character",
    tools: ["Maya", "Blender", "After Substance Painter", "Adobe After Effect"],
    color: "#4DD8FF",
    thumbnail: "/projects/jett/jett-4.jpeg",
    video: "/projects/jett/jett-video.mp4",
    model: "/models/male-optimized.glb",
    gallery: [
      "/projects/jett/jett-6.jpeg",
      "/projects/jett/jett-1.jpeg",
      "/projects/jett/jett-3.jpg",
      "/projects/jett/jett-5.jpg",
      "/projects/jett/jett-7.jpeg",
    ],
    featured: true,
    theme: {
      bg: "linear-gradient(160deg, #000608 0%, #010d14 35%, #000a10 70%, #000507 100%)",
      atmosphere: "rgba(77, 216, 255, 0.04)",
      accent: "#00D4FF",
      accentSoft: "#7ee8ff",
      highlight: "#c8f4ff",
      particle: "#00D4FF",
      fontDisplay: "'Rajdhani', sans-serif",
      fontBody: "'DM Sans', sans-serif",
      fonts: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap",
      motionStyle: "wind",
      cardBg: "rgba(0, 10, 16, 0.92)",
      border: "rgba(0, 212, 255, 0.22)",
      glowStrong: "rgba(0, 212, 255, 0.55)",
      glowSoft: "rgba(0, 212, 255, 0.12)",
    },
  },
];
export const getFeatured = () => projects.filter((p) => p.featured);
export const getById = (id) => projects.find((p) => p.id === id);
```

### `src/hooks/useCursor.js`

```js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
export const useCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    const onEnter = () => ringEl.classList.add("hovering");
    const onLeave = () => ringEl.classList.remove("hovering");
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);
  return { dotRef, ringRef };
};
```

### `src/hooks/useScrollProgress.js`

```js
import { useEffect, useState } from "react";
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? scrollTop / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
};
```

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; cursor: none; }
body {
  margin: 0;
  background-color: #050508;
  color: #E8EDF4;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  cursor: none;
}
a, button { cursor: none; }
.cursor-dot {
  width: 8px; height: 8px;
  background: #FF4D1C;
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  width: 40px; height: 40px;
  border: 1.5px solid rgba(255, 77, 28, 0.6);
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
}
.cursor-ring.hovering {
  width: 60px; height: 60px;
  border-color: #FF4D1C;
  background: rgba(255, 77, 28, 0.08);
}
.preloader {
  position: fixed; inset: 0;
  background: #050508; z-index: 10000;
  display: flex; align-items: center; justify-content: center; flex-direction: column;
}
.preloader-bar {
  width: 220px; height: 2px;
  background: #1A1A2E; margin-top: 24px;
  border-radius: 2px; overflow: hidden;
}
.preloader-progress {
  height: 100%;
  background: linear-gradient(90deg, #FF4D1C, #FF6B4A);
  border-radius: 2px; width: 0%;
  transition: width 0.08s linear;
}
@media (hover: none) {
  .cursor-dot,
  .cursor-ring {
    display: none !important;
  }
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050508; }
::-webkit-scrollbar-thumb { background: #FF4D1C; border-radius: 2px; }
.text-gradient {
  background: linear-gradient(135deg, #FF4D1C, #FF6B4A, #FFB347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.glass {
  background: rgba(15, 15, 24, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.glow-ember {
  box-shadow: 0 0 40px rgba(255, 77, 28, 0.15), 0 0 80px rgba(255, 77, 28, 0.05);
}
canvas { display: block; }
```

### `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/pages/Home.js`

```js
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeHero from "../components/ThreeHero";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projects";
gsap.registerPlugin(ScrollTrigger);
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
      {}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
        {}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,77,28,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(77,159,255,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-24 pb-16 lg:py-0 min-h-screen">
          {}
          <div className="relative z-10">
            {}
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
            {}
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
            {}
            <motion.p
              className="font-body text-slate text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.7 }}
            >
             I build 3D worlds and bring them to life — from sculpting characters to animating and finishing them for the screen.
            </motion.p>
            {}
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
            {}
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
          {}
          <motion.div
            className="relative h-[280px] sm:h-[360px] lg:h-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1.2 }}
          >
            {}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,77,28,0.12) 0%, transparent 70%)",
              }}
            />
            <ThreeHero />
          </motion.div>
        </div>
      </section>
      {}
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
      {}
      <section id="projects" className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {}
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
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      {}
      <section id="about" className="py-28 px-6 md:px-12 border-t border-border-dim" ref={aboutRef}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {}
          <div>
            {}
            <div className="mb-8 reveal-para">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <img
                  src="/ob.png"
                  alt="Omkar Bane"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ border: "1px solid #1A1A2E" }}
                />
                {}
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
          {}
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
```

### `src/pages/ProjectDetail.js`

```js
import React, { useEffect, useRef, Suspense, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import { getById, projects } from "../data/projects";
const ModelViewer = React.lazy(() => import("../components/ModelViewer"));
gsap.registerPlugin(ScrollTrigger);
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
const STREAK_STYLE_ID = "wind-streak-keyframes";
const injectStreakStyles = () => {
  if (document.getElementById(STREAK_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STREAK_STYLE_ID;
  style.textContent = `
    @keyframes windSlash { from { transform: translateX(-400px) skewY(-6deg); } to { transform: translateX(115vw) skewY(-6deg); } }
    .wind-streak { position: absolute; left: 0; pointer-events: none; animation: windSlash linear infinite; will-change: transform; }
    @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
    .gallery-card-visible { animation: fadeSlideIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
  `;
  document.head.appendChild(style);
};
const WindStreaks = ({ color }) => {
  useEffect(() => { injectStreakStyles(); }, []);
  const streaks = useMemo(() => [
    { top: "8%",  width: 260, height: 1, opacity: 0.22, duration: "4.2s", delay: "0s"   },
    { top: "21%", width: 180, height: 2, opacity: 0.38, duration: "3.1s", delay: "1.4s" },
    { top: "35%", width: 340, height: 1, opacity: 0.18, duration: "5.0s", delay: "0.7s" },
    { top: "49%", width: 220, height: 3, opacity: 0.45, duration: "3.6s", delay: "2.1s" },
    { top: "63%", width: 160, height: 1, opacity: 0.20, duration: "4.8s", delay: "0.3s" },
    { top: "77%", width: 300, height: 2, opacity: 0.32, duration: "3.9s", delay: "1.8s" },
    { top: "88%", width: 200, height: 1, opacity: 0.16, duration: "5.5s", delay: "0.9s" },
    { top: "55%", width: 140, height: 2, opacity: 0.28, duration: "2.8s", delay: "3.0s" },
  ], []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {streaks.map((s, i) => (
        <div key={i} className="wind-streak" style={{
          top: s.top, width: s.width, height: s.height,
          background: `linear-gradient(90deg, transparent 0%, ${color} 45%, ${color} 65%, transparent 100%)`,
          opacity: s.opacity, animationDuration: s.duration, animationDelay: s.delay,
        }} />
      ))}
    </div>
  );
};
const FloatParticles = ({ color }) => {
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
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
  if (theme.motionStyle === "wind") return <WindStreaks color={theme.particle} />;
  return <FloatParticles color={theme.particle} />;
};
const Gallery = ({ project, theme, galleryRef }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 420, behavior: "smooth" });
  };
  return (
    <div className="mt-20" ref={galleryRef}>
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent, fontFamily: theme.fontBody }}>Gallery</p>
        <span className="font-mono text-xs" style={{ color: theme.accentSoft, opacity: 0.45 }}>{project.gallery.length} images</span>
      </div>
      <div className="relative">
        {}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.accentSoft }}
          aria-label="Scroll left"
        >‹</button>
        {}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.accentSoft }}
          aria-label="Scroll right"
        >›</button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)" }}>
                <span className="font-mono text-xs px-3 py-1.5" style={{ color: theme.accent, border: `1px solid ${theme.accent}` }}>view</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {}
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
  );
};
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getById(id);
  const theme = project?.theme || DEFAULT_THEME;
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
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
  const { ref: modelRef, inView: modelInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;
  useEffect(() => {
    if (!project) return;
    injectStreakStyles();
    const sections = contentRef.current?.querySelectorAll(".content-block");
    sections?.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }, delay: i * 0.08,
      });
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gallery-card-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    const imgs = galleryRef.current?.querySelectorAll(".gallery-img");
    imgs?.forEach((el) => { el.style.opacity = "0"; observer.observe(el); });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); observer.disconnect(); };
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
      {}
      <div className="fixed inset-0 pointer-events-none" style={{ background: theme.bg, zIndex: -1 }} />
      {}
      <AtmosphereLayer theme={theme} />
      {}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)", zIndex: 1 }}
      />
      {}
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
      {}
      <section ref={heroRef} className="relative h-[75vh] overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 scale-110">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
        </div>
        {}
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        {}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)" }} />
        {}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${theme.accent}55 0%, ${theme.accent}22 40%, transparent 100%)` }} />
        {}
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.7), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-xs px-3 py-1 tracking-widest uppercase"
                style={{ background: "rgba(0,0,0,0.55)", color: "#ffffff", border: `1px solid rgba(255,255,255,0.25)`, fontFamily: theme.fontBody }}>
                {project.category}
              </span>
              <span className="font-mono text-xs" style={{ color: "#ffffff", opacity: 0.7 }}>{project.year}</span>
            </div>
            <h1 className="leading-none tracking-tight"
              style={{ fontFamily: theme.fontDisplay, color: theme.highlight, fontSize: "clamp(4rem,11vw,9rem)", textShadow: `0 0 40px ${theme.accent}88` }}>
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
      {}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-20" ref={contentRef} style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {}
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
            {}
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
                  {}
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
            {}
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
            {}
            {project.video && (
              <motion.div className="mt-14 content-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: theme.accentSoft, opacity: 0.6, fontFamily: theme.fontBody }}>Project Video</p>
                <div className="relative aspect-video overflow-hidden" style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}>
                  <video src={project.video} controls className="w-full h-full object-cover" poster={project.thumbnail} />
                </div>
              </motion.div>
            )}
          </div>
          {}
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
        {}
        {project.gallery?.length > 0 && (
          <Gallery project={project} theme={theme} galleryRef={galleryRef} />
        )}
      </div>
      {}
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
```

### `src/reportWebVitals.js`

```js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
export default reportWebVitals;
```

### `src/setupTests.js`

```js
import '@testing-library/jest-dom';
```

### `tailwind.config.js`

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0F",
        void: "#050508",
        ember: "#FF4D1C",
        "ember-dark": "#CC3200",
        "ember-glow": "#FF6B4A",
        slate: "#8892A4",
        "slate-light": "#B8C4D4",
        platinum: "#E8EDF4",
        "card-bg": "#0F0F18",
        "border-dim": "#1A1A2E",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
```

### `vercel.json`

```json
{
  "headers": [
    {
      "source": "/models/(.*).glb",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

*End of context. You now have full visibility into this project.*
