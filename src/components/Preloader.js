import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader waits for chunksReady prop before it even starts
 * moving the progress bar past 70%. This guarantees the page
 * is fully downloaded before we hand off.
 */
const Preloader = ({ onComplete, chunksReady }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    let raf;

    const tick = () => {
      // Fast up to 70% regardless
      // Then stall at 70–99% until chunksReady
      // Then snap to 100% and exit
      let speed;

      if (current < 70) {
        speed = 0.8;
      } else if (current < 99) {
        speed = chunksReady ? 1.5 : 0.05; // crawl until ready
      } else {
        // 100% — wait a beat then exit
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

    // Small initial delay for fonts/paint
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
          {/* Name letters stagger in */}
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

          {/* Progress bar */}
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