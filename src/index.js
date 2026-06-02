import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ── Kick off GLB downloads immediately, before any component mounts
import "./preload";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ── Service worker: caches .glb files for instant repeat loads
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("SW registration failed:", err);
    });
  });
}