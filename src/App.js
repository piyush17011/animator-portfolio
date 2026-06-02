import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

// ── Eager-start both chunks so they're in flight immediately,
//    but still lazy for the Suspense boundary (no ModelPreloader needed)
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
      {!showApp && (
        <Preloader
          chunksReady={chunksReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      <div style={{ visibility: showApp ? "visible" : "hidden" }}>
        <Router>
          {/* ModelPreloader REMOVED — it was creating a WebGL context on every page load */}
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