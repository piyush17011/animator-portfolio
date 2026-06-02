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

    // ── Per-project theme ─────────────────────────────────────────────────────
    // Each project can define its own full atmosphere.
    // ProjectDetail reads this and applies it via CSS variables + bg effects.
    theme: {
      // Background: void black with barely-there deep teal undertone
      bg: "linear-gradient(160deg, #000608 0%, #010d14 35%, #000a10 70%, #000507 100%)",
      // Floating atmospheric layer
      atmosphere: "rgba(77, 216, 255, 0.04)",
      // Primary accent — Jett electric cyan, full saturation
      accent: "#00D4FF",
      // Secondary accent — cooler ice white
      accentSoft: "#7ee8ff",
      // Text highlight — near-white with cold tint
      highlight: "#c8f4ff",
      // Hero overlay — crushes shadows hard, keeps highlights
     
      // Particle / wind streak color
      particle: "#00D4FF",
      // Font pairing
      fontDisplay: "'Rajdhani', sans-serif",
      fontBody: "'DM Sans', sans-serif",
      fonts: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap",
      // Animation style: includes knives
      motionStyle: "wind",
      // Card/panel background — near-opaque black with cyan tint
      cardBg: "rgba(0, 10, 16, 0.92)",
      // Border color — more visible cyan line
      border: "rgba(0, 212, 255, 0.22)",
      // Glow intensity for shadows/halos
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
    model: "/models/male-optimized1.glb",
    gallery: [
      "/projects/jett/jett-6.jpeg",
      "/projects/jett/jett-1.jpeg",
      "/projects/jett/jett-3.jpg",
      "/projects/jett/jett-5.jpg",
      "/projects/jett/jett-7.jpeg",
    ],
    featured: true,

    // ── Per-project theme ─────────────────────────────────────────────────────
    // Each project can define its own full atmosphere.
    // ProjectDetail reads this and applies it via CSS variables + bg effects.
    theme: {
      // Background: void black with barely-there deep teal undertone
      bg: "linear-gradient(160deg, #000608 0%, #010d14 35%, #000a10 70%, #000507 100%)",
      // Floating atmospheric layer
      atmosphere: "rgba(77, 216, 255, 0.04)",
      // Primary accent — Jett electric cyan, full saturation
      accent: "#00D4FF",
      // Secondary accent — cooler ice white
      accentSoft: "#7ee8ff",
      // Text highlight — near-white with cold tint
      highlight: "#c8f4ff",
      // Hero overlay — crushes shadows hard, keeps highlights
     
      // Particle / wind streak color
      particle: "#00D4FF",
      // Font pairing
      fontDisplay: "'Rajdhani', sans-serif",
      fontBody: "'DM Sans', sans-serif",
      fonts: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap",
      // Animation style: includes knives
      motionStyle: "wind",
      // Card/panel background — near-opaque black with cyan tint
      cardBg: "rgba(0, 10, 16, 0.92)",
      // Border color — more visible cyan line
      border: "rgba(0, 212, 255, 0.22)",
      // Glow intensity for shadows/halos
      glowStrong: "rgba(0, 212, 255, 0.55)",
      glowSoft: "rgba(0, 212, 255, 0.12)",
    },
  },


  // ── Future projects — add a `theme` object to each ────────────────────────
  // Example theme keys for reference when you uncomment these:
  //
  // {
  //   id: "fluid-dreams",
  //   ...
  //   theme: {
  //     bg: "linear-gradient(160deg, #020818 0%, #05102e 100%)",
  //     accent: "#4D9FFF",
  //     accentSoft: "#a0c8ff",
  //     highlight: "#dceeff",
  //     heroOverlay: "linear-gradient(to bottom, rgba(2,8,24,0.1) 0%, rgba(2,8,24,0.92) 100%)",
  //     atmosphere: "rgba(77,159,255,0.05)",
  //     particle: "#4D9FFF",
  //     fontDisplay: "'Unbounded', sans-serif",
  //     fontBody: "'Instrument Sans', sans-serif",
  //     fonts: "https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700&family=Instrument+Sans:wght@300;400&display=swap",
  //     motionStyle: "float",
  //     cardBg: "rgba(2, 10, 28, 0.85)",
  //     border: "rgba(77,159,255,0.18)",
  //   },
  // },
  //
  // {
  //   id: "echo-chamber",
  //   ...
  //   theme: {
  //     bg: "linear-gradient(160deg, #0d0014 0%, #1a0028 100%)",
  //     accent: "#B44DFF",
  //     accentSoft: "#dda0ff",
  //     highlight: "#f0d8ff",
  //     heroOverlay: "linear-gradient(to bottom, rgba(13,0,20,0.1) 0%, rgba(13,0,20,0.92) 100%)",
  //     atmosphere: "rgba(180,77,255,0.05)",
  //     particle: "#B44DFF",
  //     fontDisplay: "'Bebas Neue', sans-serif",
  //     fontBody: "'Lato', sans-serif",
  //     fonts: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato:wght@300;400&display=swap",
  //     motionStyle: "pulse",
  //     cardBg: "rgba(13, 2, 22, 0.85)",
  //     border: "rgba(180,77,255,0.18)",
  //   },
  // },

  // {
  //   id: "fluid-dreams",
  //   title: "Fluid Dreams",
  //   category: "3D Animation",
  //   year: "2024",
  //   description: "An exploration of liquid simulation at macro scale — water, mercury, and luminescent fluid interacting with invisible forces across a 4-minute experimental piece.",
  //   shortDesc: "Macro liquid simulation experimental piece",
  //   tools: ["Houdini", "Redshift", "Nuke", "After Effects"],
  //   color: "#4D9FFF",
  //   thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  //   video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1200&q=80",
  //   ],
  //   featured: true,
  // },
  // {
  //   id: "echo-chamber",
  //   title: "Echo Chamber",
  //   category: "Character Animation",
  //   year: "2023",
  //   description: "Award-winning short film following a musician whose emotions manifest as physical soundwave entities. A study in squash-and-stretch pushed to its expressive limits.",
  //   shortDesc: "Award-winning animated short film",
  //   tools: ["Maya", "Arnold", "After Effects", "Premiere Pro"],
  //   color: "#B44DFF",
  //   thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  //   video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   gallery: [
  //     "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  //   ],
  //   featured: true,
  // },
  // {
  //   id: "data-bloom",
  //   title: "Data Bloom",
  //   category: "Data Visualization",
  //   year: "2023",
  //   description: "Transforming 10 years of climate data into a living, breathing animation. Each petal represents a year, each color a temperature anomaly.",
  //   shortDesc: "Climate data as living animation",
  //   tools: ["TouchDesigner", "Python", "After Effects", "Blender"],
  //   color: "#4DFF91",
  //   thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  //   video: null,
  //   gallery: [
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  //   ],
  //   featured: false,
  // },
  // {
  //   id: "phantom-signal",
  //   title: "Phantom Signal",
  //   category: "Broadcast Design",
  //   year: "2023",
  //   description: "Complete on-air package for a global streaming platform's sci-fi genre hub — idents, bumpers, lower thirds, and channel branding.",
  //   shortDesc: "Complete broadcast package for streaming",
  //   tools: ["After Effects", "Cinema 4D", "Illustrator", "DaVinci"],
  //   color: "#FFD44D",
  //   thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
  //   video: null,
  //   gallery: [
  //     "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  //   ],
  //   featured: false,
  // },
  // {
  //   id: "morphic-field",
  //   title: "Morphic Field",
  //   category: "Generative Art",
  //   year: "2022",
  //   description: "Generative art installation driven by real-time biometric data from gallery visitors. Breathing rates and heartbeats sculpt the evolving forms.",
  //   shortDesc: "Real-time biometric generative installation",
  //   tools: ["TouchDesigner", "GLSL", "Arduino", "Resolume"],
  //   color: "#FF4D8B",
  //   thumbnail: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
  //   video: null,
  //   gallery: [
  //     "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  //   ],
  //   featured: false,
  // },
];

export const getFeatured = () => projects.filter((p) => p.featured);
export const getById = (id) => projects.find((p) => p.id === id);