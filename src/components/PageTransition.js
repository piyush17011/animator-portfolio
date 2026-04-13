import React from "react";
import { motion } from "framer-motion";

/**
 * PageTransition — wraps every page with a smooth enter/exit animation.
 * Uses a "curtain" wipe from bottom and a subtle Y-slide for content.
 */
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
    {/* Top curtain wipe */}
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
