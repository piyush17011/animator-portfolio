import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import { projects } from "./data/projects";

// ── Background GLB preloader ──────────────────────────────────────────────────
// Renders a 1×1 invisible Canvas and loads every model into the GLTF cache
// so by the time the user navigates to a project page, the GLB is already ready.

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

// ── Lazy page chunks ──────────────────────────────────────────────────────────
// Start the network requests immediately (not inside lazy()) so chunks are
// already in-flight before the preloader animation finishes.

const HomePromise = import("./pages/Home");
const DetailPromise = import("./pages/ProjectDetail");

const Home = lazy(() => HomePromise);
const ProjectDetail = lazy(() => DetailPromise);

// ── Animated routes ───────────────────────────────────────────────────────────

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

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [chunksReady, setChunksReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showApp, setShowApp] = useState(false);

  // Wait for both page chunks to finish downloading
  useEffect(() => {
    Promise.all([HomePromise, DetailPromise]).then(() => {
      setChunksReady(true);
    });
  }, []);

  // Show app only when chunks are ready AND preloader animation is done
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
      {/* Preloader — visible until app is ready */}
      {!showApp && (
        <Preloader
          chunksReady={chunksReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* App — rendered in background so it's painted before preloader exits */}
      <div style={{ visibility: showApp ? "visible" : "hidden" }}>
        <Router>
          {/* Silently preload all GLBs into cache while user browses homepage */}
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