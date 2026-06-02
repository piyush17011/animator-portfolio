/**
 * This replaces the AtmosphereLayer / WindStreaks / JettKnives / FloatParticles
 * sections inside ProjectDetail-jett.js (and the current ProjectDetail.js).
 *
 * Key changes:
 *  - WindStreaks now uses CSS @keyframes via injected <style> instead of
 *    43 simultaneous Framer Motion `animate` calls.
 *  - The wrapper div gets will-change: transform so the browser composites
 *    it on its own GPU layer — no layout/paint on every frame.
 *  - JettKnives and FloatParticles are kept as Framer Motion but wrapped
 *    in will-change containers so they don't repaint the page.
 *
 * USAGE: drop this file into src/components/AtmosphereLayer.js
 * and replace the inline WindStreaks/JettKnives/FloatParticles/AtmosphereLayer
 * definitions in ProjectDetail.js with:
 *
 *   import AtmosphereLayer from "../components/AtmosphereLayer";
 */

import React, { useMemo, useEffect } from "react";
import { motion } from "framer-motion";

// ── Inject CSS keyframes once ─────────────────────────────────────────────────
let stylesInjected = false;
const injectStreakStyles = () => {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes streak-fly {
      from { transform: translateX(-340px) skewY(var(--skew)); }
      to   { transform: translateX(140vw)  skewY(var(--skew)); }
    }
    .wind-streak {
      position: absolute;
      left: 0;
      animation: streak-fly linear infinite;
      animation-duration: var(--dur);
      animation-delay: var(--delay);
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
};

// ── Wind streaks — pure CSS animation, zero JS per frame ─────────────────────
const WindStreaks = ({ color }) => {
  useEffect(() => { injectStreakStyles(); }, []);

  const streaks = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      top: `${3 + (i / 22) * 94}%`,
      width: `${120 + Math.random() * 340}px`,
      height: i % 5 === 0 ? "3px" : i % 3 === 0 ? "2px" : "1px",
      opacity: i % 5 === 0 ? 0.55 : i % 3 === 0 ? 0.32 : 0.18,
      duration: `${(1.6 + Math.random() * 2.8).toFixed(2)}s`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
      skew: `${(-4 + Math.random() * -10).toFixed(1)}deg`,
      blur: i % 5 === 0 ? "1px" : "0px",
    })), []
  );

  return (
    // Single composited layer for ALL streaks
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
        willChange: "transform", // own GPU layer
      }}
    >
      {streaks.map((s) => (
        <div
          key={s.id}
          className="wind-streak"
          style={{
            top: s.top,
            width: s.width,
            height: s.height,
            background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
            opacity: s.opacity,
            filter: `blur(${s.blur}) drop-shadow(0 0 4px ${color})`,
            "--dur": s.duration,
            "--delay": s.delay,
            "--skew": s.skew,
          }}
        />
      ))}
    </div>
  );
};

// ── Knife SVG ─────────────────────────────────────────────────────────────────
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

// ── Jett knives — still Framer Motion but in a composited layer ──────────────
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
        willChange: "transform",
      }}
    >
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

// ── Float particles ───────────────────────────────────────────────────────────
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        willChange: "transform",
      }}
    >
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

// ── Exported component ────────────────────────────────────────────────────────
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

export default AtmosphereLayer;