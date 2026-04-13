import React from "react";
import { useCursor } from "../hooks/useCursor";

/**
 * CustomCursor — renders the GSAP-animated dual-layer cursor.
 * Place once at the root level so it's always on screen.
 */
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
