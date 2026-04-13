import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/**
 * ThreeHero — Interactive 3D scene using vanilla Three.js
 *
 * Renders an abstract geometric sculpture made of:
 *  - Icosahedron core with wireframe overlay
 *  - Orbiting torus rings
 *  - Floating particle field
 *
 * Mouse parallax: scene tilts toward cursor position
 * GSAP floating loop: gentle bob on Y axis
 * Properly cleans up renderer + scene on unmount
 */
const ThreeHero = () => {
  const mountRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff4d1c, 8, 12);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4d9fff, 5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // ── Main Icosahedron ──
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f18,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xff4d1c,
      emissiveIntensity: 0.05,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icosahedron);

    // Wireframe overlay on ico
    const wireGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff4d1c,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireframe);

    // ── Torus Ring 1 ──
    const torusGeo1 = new THREE.TorusGeometry(1.8, 0.012, 8, 80);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xff4d1c,
      transparent: true,
      opacity: 0.7,
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.rotation.x = Math.PI / 3;
    scene.add(torus1);

    // ── Torus Ring 2 ──
    const torusGeo2 = new THREE.TorusGeometry(2.1, 0.008, 8, 80);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x4d9fff,
      transparent: true,
      opacity: 0.4,
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.z = Math.PI / 5;
    scene.add(torus2);

    // ── Particle Field ──
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xb8c4d4,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Group for parallax ──
    const group = new THREE.Group();
    group.add(icosahedron, wireframe, torus1, torus2, particles);
    scene.add(group);

    // ── GSAP floating animation ──
    gsap.to(group.position, {
      y: 0.3,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation Loop ──
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth parallax
      target.x += (mouse.x * 0.4 - target.x) * 0.05;
      target.y += (mouse.y * 0.3 - target.y) * 0.05;
      group.rotation.y = target.x;
      group.rotation.x = target.y;

      // Constant slow spin
      icosahedron.rotation.y = t * 0.15;
      wireframe.rotation.y = t * 0.15;
      wireframe.rotation.x = t * 0.08;

      // Rings orbiting
      torus1.rotation.z = t * 0.3;
      torus2.rotation.z = -t * 0.2;

      // Particles drift
      particles.rotation.y = t * 0.05;

      // Light pulse
      pointLight1.intensity = 8 + Math.sin(t * 2) * 2;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ──
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Store refs for cleanup
    stateRef.current = { renderer, rafId, scene };

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      // Dispose all geometries and materials
      [icoGeo, wireGeo, torusGeo1, torusGeo2, particleGeo].forEach((g) => g.dispose());
      [icoMat, wireMat, torusMat1, torusMat2, particleMat].forEach((m) => m.dispose());
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
};

export default ThreeHero;
