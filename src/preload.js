/**
 * src/preload.js
 *
 * Called once when imported in index.js.
 * useGLTF.preload() is a static method (not a hook) — safe to call here.
 * It starts downloading every GLB immediately when the JS bundle parses,
 * before React even renders. By the time the user navigates to a project
 * page the model is already in the drei cache, so load time is ~0.
 */
import { useGLTF } from "@react-three/drei";
import { projects } from "./data/projects";

projects
  .filter((p) => p.model)
  .forEach((p) => {
    const absoluteUrl = p.model.startsWith("http")
      ? p.model
      : `${window.location.origin}${p.model}`;
    useGLTF.preload(absoluteUrl);
  });