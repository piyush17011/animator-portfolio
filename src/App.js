import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

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

  // Start downloading chunks immediately on mount
  useEffect(() => {
    Promise.all([HomePromise, DetailPromise]).then(() => {
      setChunksReady(true);
    });
  }, []);

  // Only show app when BOTH chunks are ready AND preloader animation finished
  useEffect(() => {
    if (chunksReady && preloaderDone) {
      // One extra frame to ensure React has painted the page
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowApp(true);
        });
      });
    }
  }, [chunksReady, preloaderDone]);

  return (
    <>
      {/* Preloader always visible until done */}
      {!showApp && (
        <Preloader
          chunksReady={chunksReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* Render app in background so it's painted before preloader exits */}
      <div style={{ visibility: showApp ? "visible" : "hidden" }}>
        <Router>
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